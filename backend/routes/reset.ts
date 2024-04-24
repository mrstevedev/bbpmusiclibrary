import express from "express";
const router = express.Router();

import reset from "../controllers/reset";

router.post("/", reset);

export default router;
