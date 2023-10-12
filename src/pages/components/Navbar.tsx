import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navPages = [
  { page: "Teams", comingSoon: false },
  { page: "Play", comingSoon: false },
  { page: "Matches", comingSoon: true },
];
import { api } from "~/utils/api";

export default function Navbar() {
  const user = api.users.getLoggedInUser.useQuery();

  const pathname = usePathname();
  return (
    <>

      <div className="h-50 flex flex-row place-content-between items-center border-b-2 border-zinc-500 border-opacity-75 py-5 px-5">


        <Link href="/">
          <Image
            className="hover:cursor-pointer"
            width={300}
            unoptimized={true}
            height={300}
            src={"/Roboverse_Animation.gif"}
            alt="VESL Logo"
          ></Image>
        </Link>


        <ul className="flex flex-row place-content-between">
          {navPages.map((page) => {
            return (
              <li key={null}>
                <Navbutton
                  selected={pathname == "/" + page.page.toLowerCase()}
                  page={page.page}
                  comingSoon={page.comingSoon}
                ></Navbutton>
              </li>
            );
          })}
        </ul>


        <div className="flex flex-col">
          <ProfilePicture width={80} height={80}></ProfilePicture>
          {/* REMOVED LOGOUT FROM NAVBAR AND PUT IN PROFILE */}
          {/* <div className="">
            <Link
              className=""
              href={"/teams/" + user.data?.Team?.name}
            >
              TEAM
            </Link>
            <button
              className=""
              onClick={() => void signOut()}
            >
              LOGOUT
            </button>
          </div> */}
        </div>
      </div>
    </>

  );
}
