import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { resendEmail } from "@/services/Api";

export const useFocus = () => {
  const router = useRouter();

  const { username, userId } = router.query;

  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      const nonce = JSON.parse(localStorage.getItem("bbp_nonce") as string);
      if (nonce < Date.now()) {
        router.push("/");
        localStorage.removeItem("bbp_nonce");
        toast.warn(
          "Your session has expired. Another email has been sent to create your password."
        );

        resendEmail({ username, nonce, userId });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return { onVisibilityChange };
};
