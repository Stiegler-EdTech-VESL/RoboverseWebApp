import { useSession } from "next-auth/react";
// import Head from "next/head";
// import Link from "next/link";
// import { api } from "~/utils/api";
// import Image from "next/image";
import HomePage from "./components/HomePage";

export default function Home() {

  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <HomePage />
    </>
  );
}
