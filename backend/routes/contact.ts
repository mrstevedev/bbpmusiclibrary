import express from "express";
const router = express.Router();

import contact from "../controllers/contact";

router.post("/", contact);

export default router;
