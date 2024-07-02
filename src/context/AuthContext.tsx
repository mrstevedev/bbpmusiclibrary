"use client";
import { useState, useEffect, createContext } from "react";

export type Auth = {
  userId: number;
  status: string;
  userEmail: string;
  userNiceName: string;
  token: string;
};

export type TAuthContext = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<TAuthContext>({} as any);

type AuthProps = React.PropsWithChildren;

export const AuthProvider = ({ children }: AuthProps) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authUser = JSON.parse(localStorage.getItem("bbp_user") as string);
      setAuth(authUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
