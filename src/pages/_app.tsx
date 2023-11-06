import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "./components/Layout";
import { Analytics } from "@vercel/analytics/react";
import { client } from "../ApolloClient/client";
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from "@nextui-org/react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </NextUIProvider>
      </ApolloProvider>
    </SessionProvider>

  );
};

export default api.withTRPC(MyApp);
