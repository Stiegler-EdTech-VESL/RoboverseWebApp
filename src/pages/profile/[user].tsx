/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Profile() {
  const { data: sessionData } = useSession();

  const router = useRouter();
  let userName = router.query.user;
  if (!userName || Array.isArray(userName)) {
    userName = "GhostUser";
  }

  const user = api.users.getUserByName.useQuery({ name: userName });

  if (!user.data) {
    return (
      <>
        <div className="flex items-center justify-center">
          <Image
            alt="Loading"
            src={"/spinner.svg"}
            width={200}
            height={200}
          ></Image>
        </div>
      </>
    );
  }

  if (!user) {
    return <div>Error: User not found.</div>;
  }

  return (
    <>
      
        <div className="flex flex-col mx-auto items-center mt-10 w-1/2 gap-4">
          <div className="flex flex-col items-center">
            <Image
              className="rounded-full border-2 border-gray-300"
              alt={user.data.name + "'s Profile Picture"}
              width={300}
              height={300}
              quality={100}
              src={
                user
                  ? user.data.image
                    ? user.data.image
                    : "/GhostUser.png"
                  : "/Spinner.svg"
              }
            />
     
          <h1 className="text-3xl font-bold">{user.data.name}</h1>
          </div>
         <div className="flex flex-col items-center w-1/4 gap-2">     
          {sessionData?.user.id === user.data.id ? (
            <Button
              className="bg-zinc-500 text-md font-semibold rounded-md w-full h-8 text-white hover:bg-black hover:border hover:border-green-600"
              onClick={() => void signOut()}
            >
              Log Out
            </Button>
          ) : null}
          <Button className="bg-zinc-500 text-md font-semibold rounded-md w-full h-8 text-white hover:bg-black hover:border hover:border-green-600">
            <Link
              className=""
              href={"/players/" + user.data.name}
            >
              View My Stats
            </Link>
          </Button>
          </div>
        </div>
      
    </>
  );
}
