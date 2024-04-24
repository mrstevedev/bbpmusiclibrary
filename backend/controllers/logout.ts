const logout = (req: any, res: any) => {
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

export default logout;

// module.exports = { logout };
// export {};
