import { FC, useEffect} from 'react';
import Image from 'next/image';
import { api } from "~/utils/api";
import Link from 'next/link';
import ProfileNamePic from './ProfileNamePic';
import { useRouter } from 'next/router';
import { match } from 'assert';
import { EquationMatch } from '@prisma/client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

interface eqMatchListUserProps {
    userId: string,
}


const EqMatchListUser: FC<eqMatchListUserProps> = ({ userId}) => {
    
    const user = api.users.getUserById.useQuery({ id: userId },{enabled: !!userId});
    const userEqMatches = user.data?.UserInEquationMatch;
    const matchIdList: string[] = [];

    userEqMatches?.map((match) => {
        matchIdList.push(match.equationMatchId)
    });

    const matchObjList = api.eqMatches.getEqMatches.useQuery({ids: matchIdList});

    if (!matchObjList?.data) {
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
        <Table className=" rounded-md">
          <TableHeader className="">
            <TableColumn className="bg-green-500 text-black">Date</TableColumn>
            <TableColumn className="bg-green-500 py-2 text-black">
              Match Type
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              Score
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              Rank After
            </TableColumn>
          </TableHeader>
          <TableBody
            className=" rounded-md bg-gray-900"
            emptyContent={"No rows to display."}
          >
        {
            matchObjList.data!.map((match)=>{
                let i = matchObjList.data?.indexOf(match);
                return <TableRow key={i}>
                    <TableCell>
                        {String(match.ended)}
                    </TableCell>
                    <TableCell>
                        {match.type}
                    </TableCell>
                </TableRow>
            })
        }
          </TableBody>
        </Table>
      );
    }
};

export default EqMatchListUser;