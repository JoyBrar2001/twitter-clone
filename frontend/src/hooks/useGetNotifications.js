import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const useGetNotifications = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notification");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { notifications, isLoading };
};

export default useGetNotifications;