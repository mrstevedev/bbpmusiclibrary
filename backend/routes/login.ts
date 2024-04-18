import express from "express";
const router = express.Router();

const LoginController = require("../controllers/login");

router.post("/", LoginController.login);

export default router;
