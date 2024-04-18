import express from "express";
const app = express();
import cors from "cors";

import createRoute from "./routes/create";
import loginRoute from "./routes/login";
import logoutRoute from "./routes/logout";
import updateRoute from "./routes/update";
import resendRoute from "./routes/resend";
import resetRoute from "./routes/reset";
import couponsRoute from "./routes/coupons";
import contactRoute from "./routes/contact";

require("dotenv").config({ path: ".env" });

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

// Register routes
app.use("/create", createRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/update", updateRoute);
app.use("/resend", resendRoute);
app.use("/reset", resetRoute);
app.use("/coupons", couponsRoute);
app.use("/contact", contactRoute);

export default app;
