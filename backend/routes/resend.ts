import express from "express";
const router = express.Router();

import resend from "../controllers/resend";

router.post("/", resend);

export default router;
