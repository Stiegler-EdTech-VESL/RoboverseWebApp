import { FC } from "react";
import RankImage from "./RankImage";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  isModalOpen: boolean;
  onModalChange: (newType: boolean) => void;
}

const RankGuide: FC<ModalProps> = ({ isModalOpen, onModalChange }) => {
  const handleModalChange = () => {
    if (isModalOpen) {
      onModalChange(false);
    }
  };
  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-white bg-opacity-25 backdrop-blur-sm">
      <div className="flex w-2/6 flex-col">
        <XMarkIcon
          className="w-10 place-self-end text-white hover:cursor-pointer hover:text-red-500"
          onClick={handleModalChange}
        ></XMarkIcon>
        <div className="flex flex-col items-center rounded-md bg-white bg-opacity-90 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="place-self-center">
              <RankImage
                team_rank_title="Charcoal"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Charcoal
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Bronze_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Bronze_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Bronze_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Bronze 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Silver_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Silver_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Silver_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Silver 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Gold_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Gold_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Gold_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Gold 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Silicon_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Silicon_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Silicon_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Silicon 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Diamond_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Diamond_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Diamond_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Diamond 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Champ_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Champ_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Champ_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Champion 1-3
            </div>
            <div className="flex flex-row justify-center">
              <RankImage
                team_rank_title="Grand_1"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Grand_2"
                width={50}
                height={50}
              ></RankImage>
              <RankImage
                team_rank_title="Grand_3"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Grand Champion 1-3
            </div>
            <div className="place-self-center">
              <RankImage
                team_rank_title="Legend"
                width={50}
                height={50}
              ></RankImage>
            </div>
            <div className="flex flex-row items-center text-xl text-black">
              Legend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankGuide;
