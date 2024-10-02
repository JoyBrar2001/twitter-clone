import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useLikePost = (postId) => {
  const queryClient = useQueryClient();

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/post/like/${postId}`, {
          method: "POST",
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
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData([QUERY_KEYS.POSTS], (oldData) => {
        return oldData.map((p) => {
          if (p._id === postId) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
      toast.success("Post liked successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { likePost, isLiking };
};

export default useLikePost;
