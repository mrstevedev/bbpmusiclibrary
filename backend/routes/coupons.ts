import express from "express";
const router = express.Router();

const CouponController = require("../controllers/coupons");

router.post("/", CouponController.coupons);

export default router;
