import express, { Request, Response } from "express";
const router = express.Router();

type TResetController = {
  reset: (req: Request, res: Response) => void;
};

const resetController: TResetController = require("../controllers/reset");

router.post("/", resetController.reset);

export default router;
