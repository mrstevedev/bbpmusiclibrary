import express from "express";
const router = express.Router();

const LogoutController = require("../controllers/logout");

router.get("/", LogoutController.logout);

export default router;
