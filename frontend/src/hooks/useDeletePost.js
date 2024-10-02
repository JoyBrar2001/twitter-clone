import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async (postId) => {
      try {
        const res = await fetch(`/api/post/${postId}`, {
          method: "DELETE",
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
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });

  return { deletePost, isPending };
};

export default useDeletePost;