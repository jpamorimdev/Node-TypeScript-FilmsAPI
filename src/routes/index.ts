import express, { Request, Response } from "express";
import HealthController from "../controllers/health.controller";
import APIRouter from "./api.router";


const router = express.Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/healthcheck", async (req: Request, res: Response) => {
  return res.sendStatus(await HealthController.getStatus());
});

router.use("/api", APIRouter);

export default router;