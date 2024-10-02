import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteNotifications, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notification", {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteNotifications };
};

export default useDeleteNotifications;