import express from "express";
const router = express.Router();

const resendController = require("../controllers/resend");

router.post("/", resendController.resend);

export default router;
