import { redirect } from "@remix-run/node";
import { getCurrentUser } from "~/modules/user/helpers";

export const securityGuard = () => {
  const user = getCurrentUser();
  if (!user) {
    throw redirect("/");
  }
};
