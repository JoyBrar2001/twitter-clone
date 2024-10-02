import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const useSuggestedUsers = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_USERS],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/suggested");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  });

  return { suggestedUsers, isLoading };
};

export default useSuggestedUsers;