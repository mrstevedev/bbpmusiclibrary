import express from "express";
const router = express.Router();

const ContactController = require("../controllers/contact");

router.post("/", ContactController.contact);

export default router;
