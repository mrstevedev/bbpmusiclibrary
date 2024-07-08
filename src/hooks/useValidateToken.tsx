import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { USER, SESSION, PRODUCT } from "@/constants/index";

export const useValidateToken = () => {
  const router = useRouter();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(USER.BBP_USER) as string)
      : false;

  useEffect(() => {
    if (user) {
      const decodedJwt = JSON.parse(atob(user?.token?.split(".")[1]));
      console.log("jwt expires:", new Date(decodedJwt.exp * 1000));
      if (decodedJwt.exp * 1000 < Date.now()) {
        setIsTokenExpired(true);
        localStorage.removeItem(USER.BBP_USER);
        localStorage.removeItem(PRODUCT.BBP_PRODUCT);
        toast.warn(SESSION.SESSION_EXPIRED);
      } else {
        setIsTokenExpired(false);
      }
    }
  }, [isTokenExpired, router, user]);

  return isTokenExpired;
};
