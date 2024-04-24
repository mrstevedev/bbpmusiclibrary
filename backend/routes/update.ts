import express from "express";
const router = express.Router();

import update from "../controllers/update";

router.post("/", update);

export default router;
