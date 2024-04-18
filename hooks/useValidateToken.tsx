import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useValidateToken = () => {
  const router = useRouter();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("bbp_user") as string)
      : false;

  useEffect(() => {
    if (user) {
      const decodedJwt = JSON.parse(atob(user?.token?.split(".")[1]));
      console.log("jwt expires:", new Date(decodedJwt.exp * 1000));
      if (decodedJwt.exp * 1000 < Date.now()) {
        setIsTokenExpired(true);
        localStorage.removeItem("bbp_user");
        localStorage.removeItem("bbp_product");
        toast.warn("Your session has expired.");
      } else {
        setIsTokenExpired(false);
      }
    }
  }, [isTokenExpired, router]);

  return isTokenExpired;
};
