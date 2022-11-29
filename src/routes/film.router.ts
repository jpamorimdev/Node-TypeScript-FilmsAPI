import express, { Request, Response } from "express";
import FilmController from "../controllers/film.controller";

const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  let limit = parseInt((+(req.query.limit || 5)).toString());
  let offset = parseInt((+(req.query.offset || 0)).toString());
  const films = await FilmController.list({ limit, offset });
  res.json(films);
});

export default router;