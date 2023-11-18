import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
const Stats = () => {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [slug, setSlug] = useState<string>("");

  const userId = session.data?.user.id;

  const { data, status } = api.users.getLoggedInUser.useQuery();

  useEffect(() => {
    if (status === "success" && userId) {
      if (data) {
        setUser(data);
      }
    }
  }, [status]);

  useEffect(() => {
    if (user) {
      const userName = user.name.toLowerCase();
      setSlug(userName);
    }
  }, [user]);

  const { push } = useRouter();

  useEffect(() => {
    if (slug) {
      push("/players/" + slug);
    }
  }, [slug]);
};

export default Stats;
