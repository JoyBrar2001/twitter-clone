import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../constants";

const useCommentPost = () => {
  const queryClient = useQueryClient();

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async ({ postId, comment }) => {
      try {
        const res = await fetch(`/api/post/comment/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
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
      toast.success("Comment posted successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { commentPost, isCommenting };
};

export default useCommentPost;