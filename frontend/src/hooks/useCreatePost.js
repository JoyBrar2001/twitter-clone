import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending, isError, error } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });

  return { createPost, isPending, isError, error };
};

export default useCreatePost;