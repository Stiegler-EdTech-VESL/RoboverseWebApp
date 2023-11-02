import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";

const Player = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const slug = router.query.player;

  let playerName = slug;

  if (!playerName || Array.isArray(playerName)) {
    playerName = "GhostPlayer";
  }

  const player = api.users.getUserByName.useQuery({ name: playerName });

  return <div></div>;
};

export default Player;
