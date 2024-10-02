import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../constants";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate: signup, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to create account.");
        }

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account Created Successfully");
      queryClient.invalidateQueries([QUERY_KEYS.AUTH_USER]);
    },
  });

  return { signup, isError, isPending, error };
};

export default useSignUp;