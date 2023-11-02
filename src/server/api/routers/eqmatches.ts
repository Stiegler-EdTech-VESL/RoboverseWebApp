import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eqmatchesRouter = createTRPCRouter({
  getAllEqMatches: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.equationMatch.findMany({
      include: {
        TeamInEquationMatch: true,
      },
    });
  }),

  getEqMatches: publicProcedure
  .input(z.object({ ids: z.array(z.string()) }))
  .query(({ input, ctx }) => {
    return ctx.prisma.equationMatch.findMany({
      where: {
        id: {
          in: input.ids,
        },
      },
    });
  }),
});
