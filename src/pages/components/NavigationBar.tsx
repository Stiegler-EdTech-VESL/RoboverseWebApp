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
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,

} from "@nextui-org/react";
import { useState } from "react";

export default function NavigationBar(props: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navPages = [
    { page: "Teams", comingSoon: false },
    { page: "Play", comingSoon: false },
    { page: "Matches", comingSoon: true },
  ];

  const pathname = usePathname();
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      height={"145px"}
      className="border-b-2 border-zinc-500 border-opacity-75 bg-black py-5"
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>


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
                selected={pathname == "/" + page.page.toLowerCase()}
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
            className="max-w-[100px] border-2 border-black hover:border-green-500"
          />
        </Link>
      </NavbarContent>
      <NavbarMenu className="">
        {navPages.map((page, index) => (
          <NavbarMenuItem key={`${page}-${index}`}>
            <Link
              className=" text-3xl"
              color="primary"
              href={page.comingSoon?"/comingsoon":"/" + page.page.toLowerCase()}
              size="lg"
            >
              {page.page}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
