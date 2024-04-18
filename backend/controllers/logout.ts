const logout = (
  req: any,
  res: {
    cookie: (
      arg0: string,
      arg1: string,
      arg2: {
        httpOnly: boolean;
        sameSite: string;
        secure: boolean;
        maxAge: number;
      }
    ) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  }
) => {
  res.cookie("bbp_customer_id", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });
  res.cookie("bbp_token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });
  return res.status(200).json({
    message: "logged out",
  });
};
module.exports = { logout };
export {};
