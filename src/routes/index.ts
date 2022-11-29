import express, { Request, Response } from "express";
import HealthController from "../controllers/health.controller";
import APIRouter from "./api.router";


const router = express.Router();

router.get("/health", async (req: Request, res: Response) => {
  return res.send(await HealthController.getMessage());
});

router.use("/api", APIRouter);

export default router;