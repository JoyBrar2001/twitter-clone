import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate: login, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to login to your account.");
        }

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logged in Successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH_USER] });
    },
  });

  return { login, isError, isPending, error };
}

export default useLogin;