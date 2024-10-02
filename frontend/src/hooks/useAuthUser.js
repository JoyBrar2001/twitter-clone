import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.AUTH_USER],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  return { authUser, isLoading };
};

export default useAuthUser;