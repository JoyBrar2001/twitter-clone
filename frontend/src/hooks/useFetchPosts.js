import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const useFetchPosts = (POST_ENDPOINT) => {
  const { data: posts, isLoading, refetch, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, POST_ENDPOINT],
    queryFn: async ({ queryKey }) => {
      const endpoint = queryKey[1];
      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error loading posts");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { posts, isLoading, refetch, isRefetching };
};

export default useFetchPosts;