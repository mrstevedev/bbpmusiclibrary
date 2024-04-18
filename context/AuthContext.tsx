import { useState, useEffect, createContext } from "react";

export type Auth = {
  userId: number;
  firstName: string;
  lastName: string;
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

type AuthProps = {
  children: object;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);

  useEffect(() => {
    if (process.browser) {
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
