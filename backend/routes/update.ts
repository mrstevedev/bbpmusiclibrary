import express from "express";
const router = express.Router();

const UpdateController = require("../controllers/update");

router.post("/", UpdateController.update);

export default router;
