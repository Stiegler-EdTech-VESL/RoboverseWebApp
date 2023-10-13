import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";
// import Link from "next/link";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
  Link,
} from "@nextui-org/react";
import { useState } from "react";

import { api } from "~/utils/api";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = api.users.getLoggedInUser.useQuery();

  const navPages = [
    { page: "Teams", comingSoon: false },
    { page: "Play", comingSoon: false },
    { page: "Matches", comingSoon: true },
  ];

  const menuItems = navPages.map((i) => i.page);
  const pathname = usePathname();
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="h-50 bg-black flex w-full flex-row place-content-between items-center border-b-2 border-zinc-500 border-opacity-75 p-5"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />

      <NavbarBrand className="hidden md:block">
        <Link href="/play">
          <Image
            className="hover:cursor-pointer"
            width={200}
            unoptimized={true}
            height={200}
            src={"/Roboverse_Animation.gif"}
            alt="VESL Logo"
          ></Image>
        </Link>
      </NavbarBrand>
      <div className="flex w-fit lg:w-[50%] px-5 mx-5">
        <ul className="hidden justify-self-center flex-row place-content-between md:flex">
          {navPages.map((page) => {
            const pageIndex = navPages.indexOf(page);
            const isFirstOrLast =
              pageIndex == 0 || pageIndex == navPages.length - 1;
            return (
              <li className={isFirstOrLast ? "" : "mx-10"} key={pageIndex}>
                <Navbutton
                  selected={pathname == "/" + page.page.toLowerCase()}
                  page={page.page}
                  comingSoon={page.comingSoon}
                ></Navbutton>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-column flex w-[25%] justify-end">
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
    </Navbar>
  );
}
