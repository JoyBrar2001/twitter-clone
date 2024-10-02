import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "An Error occoured logging you out.");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH_USER] });
      queryClient.setQueryData([QUERY_KEYS.AUTH_USER], null);
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { logout, isPending };
};

export default useLogout;