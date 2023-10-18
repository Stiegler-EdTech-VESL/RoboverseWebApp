import Image from "next/image";
import { FC } from "react";

interface RankImageProps {
  team_rank_title: string | null;
}

const RankImage: FC<RankImageProps> = ({ team_rank_title }) => {
  var imgSrc: string = "";

  //if-statements filtering for first letter in the team's rank_title

  if (team_rank_title == null) {
    imgSrc = "/rankings/charcoal.png";
    console.log("RANKKKK: " + team_rank_title);
  } else {
    if (team_rank_title == "Charcoal") {
      imgSrc = "/rankings/charcoal.png";
    }

    if (team_rank_title!.charAt(0) == "B") {
      switch (team_rank_title) {
        case "Bronze_1":
          imgSrc = "/rankings/bronze_1.png";
          break;
        case "Bronze_2":
          imgSrc = "/rankings/bronze_2.png";
          break;
        case "Bronze_2":
          imgSrc = "/rankings/bronze_2.png";
          break;
        case "Bronze_3":
          imgSrc = "/rankings/bronze_3.png";
          break;
      }
    }

    if (team_rank_title!.charAt(0) == "S") {
      switch (team_rank_title) {
        case "Silver_1":
          imgSrc = "/rankings/silver_1.png";
          break;
        case "Silver_2":
          imgSrc = "/rankings/silver_2.png";
          break;
        case "Silver_3":
          imgSrc = "/rankings/silver_3.png";
          break;
      }
    }

    if (team_rank_title!.slice(0, 2) == "Go") {
      switch (team_rank_title) {
        case "Gold_1":
          imgSrc = "/rankings/gold_1.png";
          break;
        case "Gold_2":
          imgSrc = "/rankings/gold_2.png";
          break;
        case "Gold_3":
          imgSrc = "/rankings/gold_3.png";
          break;
      }
    }
    if (team_rank_title!.charAt(0) == "S") {
      switch (team_rank_title) {
        case "Silicon_1":
          imgSrc = "/rankings/silicon_1.png";
          break;
        case "Silicon_2":
          imgSrc = "/rankings/silicon_2.png";
          break;
        case "Silicon_3":
          imgSrc = "/rankings/silicon_3.png";
          break;
      }
    }
    if (team_rank_title!.charAt(0) == "D") {
      switch (team_rank_title) {
        case "Diamond_1":
          imgSrc = "/rankings/diamond_1.png";
          break;
        case "Diamond_2":
          imgSrc = "/rankings/diamond_2.png";
          break;
        case "Diamond_3":
          imgSrc = "/rankings/diamond_3.png";
          break;
      }
    }
    if (team_rank_title!.charAt(0) == "C") {
      switch (team_rank_title) {
        case "Champ_1":
          imgSrc = "/rankings/champ_1.png";
          break;
        case "Champ_2":
          imgSrc = "/rankings/champ_2.png";
          break;
        case "Champ_3":
          imgSrc = "/rankings/champ_3.png";
          break;
      }
    }

    if (team_rank_title!.slice(0, 2) == "Gr") {
      switch (team_rank_title) {
        case "Grand_Champ_1":
          imgSrc = "/rankings/grand_1.png";
          break;
        case "Grand_Champ_2":
          imgSrc = "/rankings/grand_2.png";
          break;
        case "Grand_Champ_3":
          imgSrc = "/rankings/grand_3.png";
          break;
      }
    }

    if (team_rank_title == "Legend") {
      imgSrc = "/rankings/legend.png";
    }
  }

  return (
    <Image
      alt="image of team's rank"
      src={imgSrc}
      width={100}
      height={100}
      quality={100}
    />
  );
};

export default RankImage;
