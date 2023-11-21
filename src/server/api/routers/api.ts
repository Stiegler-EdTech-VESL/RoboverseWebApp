import { env } from "~/env.mjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const apiRouter = createTRPCRouter({
    fetchData: publicProcedure
        .input(z.object({ endpoint: z.string() }))
        .query(async ({ input }) => {
            const apiUrl = env.API_URL; // Server-side environment variable
            const apiToken = env.API_TOKEN; // Server-side environment variable

            // Setting up headers
            const headers = new Headers();
            headers.append('token', apiToken);
            headers.append('Content-Type', 'application/json');

            try {
                const response = await fetch(`${apiUrl}/${input.endpoint}`, {
                    method: 'GET',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }

                return response.json();
            } catch (error) {
                console.error('Error in tRPC fetchData procedure:', error);
                throw error;
            }
        }),
});
