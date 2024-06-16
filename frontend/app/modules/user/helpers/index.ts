import { UserResponse } from "~/modules/share/types";

export const getCurrentUser = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as UserResponse;
  }
  return null;
};
