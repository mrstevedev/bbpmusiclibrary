import express from "express";
const router = express.Router();

const CreateController = require("../controllers/create");

router.post("/", CreateController.create_customer);

export default router;
