/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import ProfileNamePic from "./ProfileNamePic";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { TableCellsIcon } from "@heroicons/react/24/solid";

export default function UserListTeam(props: { teamID: string }) {
  const users = api.users.getUsersByTeamID.useQuery({ teamId: props.teamID });

  if (!users?.data) {
    return (
      <div className=" flex items-center justify-center text-5xl italic">
        <div className="fles flex-col items-center justify-center ">
          <Image
            className="mt-[50%]"
            width={200}
            height={200}
            alt={"Loading"}
            src={"/spinner.svg"}
          ></Image>
        </div>
      </div>
    );
  } else {
    return (
      // <div className="min-w-[450px]">
        <Table className="px-2">
          <TableHeader className="">
              <TableColumn className="italic font-medium text-slate-500 text-lg">Players</TableColumn>
              <TableColumn className="italic font-medium text-slate-500 text-lg">Equations Created</TableColumn>
          </TableHeader>
          <TableBody className="flex flex-col items-center">
            {users.data?.map((user) => {
              if (!user) {
                return <></>;
              }

              return (
                <TableRow className="" key={user.id}>
                  <TableCell className=" px-10">
                    <ProfileNamePic
                      name={user.name}
                      image={user.image ? user.image : null}
                      showName={true}
                    />
                  </TableCell>
                  <TableCell className="flex flex-col items-center">
                    {user.Equation ? user.Equation.length : "0"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      // </div>
    );
  }
}
