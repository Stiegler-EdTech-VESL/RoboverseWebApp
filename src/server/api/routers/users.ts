import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getLoggedInUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    const userId = ctx.session.user.id;

    const user = ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Team: true,
      },
    });
    return user;
  }),

  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user
        .findUnique({
          where: {
            name: input.name,
          },
          include: {
            Team: {
              include: {
                District: true,
              },
            },
            UserInEquationMatch: {
              where: {
                EquationMatch: {
                  type: "Ranked",
                },
              },
              take: 5,
              include: {
                EquationMatch: true,
              },
              orderBy: {
                EquationMatch: {
                  ended: "desc", // Assuming 'createdAt' is the timestamp field
                },
              },
            },
          },
        })
        .catch(() => {
          return null; // Handle the case where the user is not found or an error occurs
        });

      if (!user) {
        return null; // or handle the user not found case appropriately
      }

      const matches = user.UserInEquationMatch.map((match) => {
        return {
          id: match.id,
          ranking:
            match.user_global_ranking_after != null
              ? Number(match.user_global_ranking_after)
              : 0,
          date: match.EquationMatch.ended,
        };
      }).reverse();

      const userData = {
        id: user.id,
        name: user.name,
        conference: user.Team!.District!.name,
        rank: user.global_ranking != null ? Number(user.global_ranking) : 0,
        rankTitle: user.global_rank_title,
        totalWon: user.totalEqMatchesWon,
        totalLost:
          user.totalEqMatchesLost != null ? Number(user.totalEqMatchesLost) : 0,
        totalTournW: user.total_tourn_wins,
        totalTournL: user.total_tourn_lost,
        image: user.image != null ? user.image : " ",
        matches: matches,
      };

      return userData;
    }),

  getUsersByTeamID: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findMany({
        where: {
          team_id: input.teamId,
        },
        include: {
          Team: true,
          Equation: true,
        },
      });
      return user;
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Team: true,
          UserInEquationMatch: true,
        },
      });
      return user;
    }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      include: {
        Team: true,
        Equation: true,
      },
    });
    return users;
  }),

  getAllUserInfo: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.user.findMany({
      include: {
        Team: {
          select: {
            name: true,
            District: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: [{ global_ranking: "desc" }],
    });
    return data;
  }),

  getTopUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      orderBy: [{ global_ranking: "desc" }],
      take: 3,
    });
  }),

  getUserGlobalRankHistory: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const matches = await ctx.prisma.userInEquationMatch
        .findMany({
          where: {
            userId: input.id,
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
          ranking: match.user_global_ranking_after,
          date: match.EquationMatch.ended,
        };
      });
      return ret?.slice(0).reverse();
    }),
});
