import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { type ReactNode } from "react";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { gql } from "@apollo/client";
import { client } from "../ApolloClient/client";
import { User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      [x: string]: ReactNode;
      id: string;
    };
  }
}

let tempDiscordId: string;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: user.id,
          name: user.name,
          image: user.image,
          email: user.email,
        },
      });
    },
    async signIn({ account }) {
      if (account?.provider === "discord") {
        // Temporarily store the Discord ID
        tempDiscordId = account?.providerAccountId;
      }

      return true;
    },
    async redirect({ url }) {
      if (url.includes("profile")) {
        return "/";
      }
      return "/play";
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  events: {
    async createUser({ user }) {
      try {
        const discordId = tempDiscordId;
        if (discordId) {
          // Update the user record with the Discord ID
          await prisma.user.update({
            where: { id: user.id },
            data: { discord_id: discordId },
          });
        }
      } catch (error) {
        console.error("Error in createUser event:", error);
      }

      // GraphQL query for the Discord Bot DB
      const GET_USER_QUERY = gql`
        query GetUser($discordId: String!) {
          user(where: { discord_id: { _eq: $discordId } }) {
            school_id
          }
        }
      `;

      try {
        // Execute the query with the user's Discord ID
        const { data } = await client.query({
          query: GET_USER_QUERY,
          variables: {
            discordId: tempDiscordId,
          },
        });

        //If data is returned, find the user in the Roboverse DB
        if (data && data.user.length > 0) {
          const currentTeam = (user as User).team_id; //Team ID in the Roboverse DB
          const realTeam = data.user[0].school_id; //School ID in Discord Bot DB
          let isTeaminRobo = true;
          const teamInRobo = await prisma.team.findUnique({
            //Does this team exist in Roboverse DB?
            where: {
              id: realTeam,
            },
          });
          if (!teamInRobo) {
            isTeaminRobo = false;
          }

          if (currentTeam !== realTeam) {
            //If Team ID and School ID are not equal, update the Team ID in Roboverse DB
            if (!isTeaminRobo) {
              //If the Team does not exist in Roboverse DB, default team_id to Guest
              await prisma.user.update({
                where: {
                  id: user.id,
                },
                data: {
                  team_id: "e968e4fc-80e6-4868-8e83-d6451c2bfcaa",
                },
              });
            } else {
              await prisma.user.update({
                //If the Team does exist in Roboverse DB, update user.team_id
                where: {
                  id: user.id,
                },
                data: {
                  team_id: realTeam,
                },
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching User's team from Bot:", error);
      }
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  console.log("authOptions", authOptions);
  return getServerSession(ctx.req, ctx.res, authOptions);
};
