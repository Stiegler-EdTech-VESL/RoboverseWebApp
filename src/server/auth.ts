import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { DiscordProfile } from "next-auth/providers/discord";
import { type ReactNode } from "react";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { gql } from "@apollo/client";
import { client } from "../ApolloClient/client";



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

    async signIn({ user, account, profile }) {
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
            discordId: (profile as DiscordProfile).id,
          },
        });

        //If data is returned, find the user in the Roboverse DB
        if (data && data.user.length > 0) {
          const currentUser = await prisma.user.findUnique({
            where: {
              id: user.id,
            }
          })
          const currentTeam = currentUser?.team_id; //Team ID in the Roboverse DB
          const realTeam = data.user[0].school_id //School ID in Discord Bot DB

          if(currentTeam !== realTeam) { //If Team ID and School ID are not equal, update the Team ID in Roboverse DB
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                team_id: realTeam,
              }
            });
          };
        };

        // Continue with the sign-in process
        return true;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
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
