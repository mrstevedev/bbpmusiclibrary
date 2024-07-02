import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

import { resendEmail } from "@/services/Api";
import { SESSION_EXPIRED } from "@/constants/index";

export const useFocus = () => {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params?.get("userID") as string;
  const username = params?.get("email") as string;

  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      const session = JSON.parse(localStorage.getItem("bbp_session") as string);
      if (session < Date.now()) {
        router.push("/");
        if (session) {
          toast.warn(SESSION_EXPIRED);
        }
        localStorage.removeItem("bbp_session");
        resendEmail({ username, session, userId });
      }
    }
  }, [router, userId, username]);

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [onVisibilityChange]);

  return { onVisibilityChange };
};
