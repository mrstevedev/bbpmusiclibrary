import express from "express";
const router = express.Router();

import coupons from "../controllers/coupons";

router.post("/", coupons);

export default router;
