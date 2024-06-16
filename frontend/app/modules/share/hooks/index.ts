import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { getCurrentUser } from "~/modules/user/helpers";

export const useSessionStore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);
};
