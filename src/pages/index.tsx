import { useSession } from "next-auth/react";
// import Head from "next/head";
// import Link from "next/link";
// import { api } from "~/utils/api";
// import Image from "next/image";
import HomePage from "./components/HomePage";
import { useQuery, gql } from "@apollo/client";

const TESTING = gql`
query {
  user(where: {discord_id: {_eq: "856213920913686580"}}) {
    school_id
  }
}
`;

export default function Home() {

  const {data, loading, error} = useQuery(TESTING);
  if(loading){
    console.log("pooooping")
  }

  if(error){
    console.log(error)
  }

  if(data){

  console.log("Letttts gooo: " + JSON.stringify(data.user[0].school_id));
}

  const { data: session } = useSession();

  console.log(JSON.stringify(session));

  return (
    <>
      <HomePage />
    </>
  );
}
