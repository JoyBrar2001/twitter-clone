import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const useFetchUser = (username) => {
  const { data: user, isLoading, refetch, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/user/profile/${username}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { user, isLoading, refetch, isRefetching };
}

export default useFetchUser;