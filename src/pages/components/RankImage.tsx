import Image from "next/image";
import { FC } from 'react';


interface RankImageProps {
    team_rank_title: string,
}

const RankImage: FC<RankImageProps> = ({team_rank_title}) => {

    var imgSrc: string = "";
    
    switch (team_rank_title) {
        case "Charcoal":
            imgSrc = '/rankings/charcoal.png'
            
    }


    return(
        <Image
        alt="image of team's rank"
        src={imgSrc}
        width={100}
        height={100}
        quality={100}
        />
        

    );

}

export default RankImage;