import express from "express";
const router = express.Router();

import create from "../controllers/create";

router.post("/", create);

export default router;
