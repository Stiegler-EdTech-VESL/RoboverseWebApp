import { input } from "@nextui-org/react";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { ordinal, rate } from "openskill";

export const teamsRouter = createTRPCRouter({
  getAllTeamsWithRank: publicProcedure
    .input(z.object({ districtId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.districtId === "Global") {
        return await ctx.prisma.team.findMany({
          orderBy: { global_ranking: "desc" },
        });
      } else {
        return await ctx.prisma.team.findMany({
          where: {
            districtId: input.districtId,
          },
          orderBy: { district_ranking: "desc" },
        });
      }
    }),

  getTop3Teams: publicProcedure
    .input(z.object({ districtId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.districtId === "Global") {
        return await ctx.prisma.team.findMany({
          where: {
            global_ranking: {
              not: null,
            },
          },
          orderBy: { global_ranking: "desc" },
          take: 3,
        });
      } else {
        return await ctx.prisma.team.findMany({
          where: {
            district_ranking: {
              not: null,
            },
            districtId: input.districtId,
          },
          orderBy: { district_ranking: "desc" },
          take: 3,
        });
      }
    }),

  getTeamById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        return null;
      }
      const team = await ctx.prisma.team
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            Equation: {
              include: { User: true, TeamInEquationMatch: true },
              orderBy: { elo_contribute: "desc" },
            },
            User: true,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),

  getTeamsByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) })) // expects an array of IDs
    .query(async ({ ctx, input }) => {
      // Query teams by a list of IDs using Prisma's findMany
      const teams = await ctx.prisma.team
        .findMany({
          where: {
            id: {
              in: input.ids, // use the 'in' operator to filter by an array of IDs
            },
          },
          include: {
            District: true,
          },
        })
        .catch(() => {
          return null; // handle any errors
        });
      return teams; // return the list of teams
    }),

  getTeamByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.name) {
        return null;
      }
      const team = await ctx.prisma.team
        .findUnique({
          where: {
            name: input.name,
          },
          include: {
            Equation: { include: { User: true, TeamInEquationMatch: true } },
            User: true,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),

  getTeamGlobalRankHistory: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const matches = await ctx.prisma.teamInEquationMatch
        .findMany({
          where: {
            teamId: input.id,
          },
          take: 10,
          include: {
            EquationMatch: true,
          },
          orderBy: { EquationMatch: { ended: "desc" } },
        })
        .catch(() => {
          return null;
        });

      const ret = matches?.map((match) => {
        return {
          id: match.id,
          ranking: match.global_ranking_after,
          date: match.EquationMatch.ended,
        };
      });
      return ret?.slice(0).reverse();
    }),
});
