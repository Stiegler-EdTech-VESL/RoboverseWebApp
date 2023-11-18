import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  Link,
  NavbarContent,
  NavbarItem,
  Avatar,

} from "@nextui-org/react";


export default function NavigationBar(props: any) {

  const navPages = [
    { page: "Players", comingSoon: false },
    { page: "Play", comingSoon: false },
    { page: "Stats", comingSoon: false },
  ];

  const pathname = usePathname();
  return (
    <Navbar
      height={"145px"}
      className="border-b-2 border-zinc-500 border-opacity-75 bg-black py-5 px-5"
    >


      <NavbarContent className="hidden grow-0 md:block">
        <NavbarBrand className="">
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
      </NavbarContent>
      <NavbarContent
        justify="center"
        className="hidden gap-10 md:flex lg:gap-28"
      >
        {navPages.map((page) => {
          const pageIndex = navPages.indexOf(page);
          return (
            <NavbarItem key={pageIndex}>
              <Navbutton
                selected={pathname == "/" + page.page.toLowerCase() || page.page == "Stats" && pathname == "/players/" + props.data.user.name}
                page={page.page}
                comingSoon={page.comingSoon}
              ></Navbutton>
            </NavbarItem>
          );
        })}
      </NavbarContent>


      <NavbarContent justify="end" className="">
        <Link
          href={
            props.data.user.name && typeof props.data.user.name == "string"
              ? "/profile/" + props.data.user.name
              : "/profile"
          }
        >
          <Avatar
            as="button"
            size="sm"
            src={
              props.data.user.image && typeof props.data.user.image == "string"
                ? props.data.user.image
                : "/GhostUser.png"
            }
            className="max-w-[100px] h-auto border-2 border-black hover:border-green-500"
          />
        </Link>
      </NavbarContent>

    </Navbar>
  );
}
