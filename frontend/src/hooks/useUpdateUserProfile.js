import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../constants";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch("/api/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH_USER] }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;