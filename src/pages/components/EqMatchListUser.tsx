import { FC, useEffect} from 'react';
import Image from 'next/image';
import { api } from "~/utils/api";
import Link from 'next/link';
import ProfileNamePic from './ProfileNamePic';
import { useRouter } from 'next/router';
import { match } from 'assert';
import { EquationMatch } from '@prisma/client';

interface eqMatchListProps {
    userId: string,
}

const EqMatchListUser: FC<eqMatchListProps> = ({ userId}) => {
    
    const user = api.users.getUserById.useQuery({ id: userId },{enabled: !!userId});
    const userEqMatches = user.data?.UserInEquationMatch;
    const matchIdList: string[] = [];

    userEqMatches?.map((match) => {
        matchIdList.push(match.equationMatchId)
    });

    const matchObjList = api.eqMatches.getEqMatches.useQuery({ids: matchIdList});

    // if (!user?.data) {
    //   return (
    //     <div className=" flex items-center justify-center text-5xl italic">
    //       <div className="fles flex-col items-center justify-center ">
    //         <Image
    //           className="mt-[50%]"
    //           width={200}
    //           height={200}
    //           alt={"Loading"}
    //           src={"/spinner.svg"}
    //         ></Image>
    //       </div>
    //     </div>
    //   );
    // } else {
      return (
        <div className="w-full">
          {/* <table className="w-full text-2xl">
            <thead className="sticky top-0 bg-green-500 text-black">
              <tr>
                <th className="px-4 py-2">Name / Created By</th>
                <th className="px-4 py-2">Contributed Elo</th>
                <th className="px-4 py-2">Total Matches</th>
              </tr>
            </thead>
            <tbody>
              {user.data.UserInEquationMatch.map((eq) => {
                if (!eq) {
                  return null;
                }
                const totalMatches = user.data.UserInEquationMatch.length;
                const user = eq.User;
  
                return (
                  <tr key={eq.id}>
                    <td className="flex items-center justify-center px-4 py-2 text-center ">
                      <Link
                        className="hover:underline"
                        href={"/equations/" + eq.id}
                      >
                        {eq.name}
                      </Link>
                      {user ? (
                        <ProfileNamePic
                          image={user.image ? user.image : null}
                          name={user.name}
                          showName={false}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{eq.elo_contribute}</td>
                    <td className="px-4 py-2 text-center">{totalMatches}</td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      );
    // }
};

export default EqMatchListUser;