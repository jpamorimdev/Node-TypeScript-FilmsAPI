import express, { Request, Response } from "express";
import FilmRouter from "./film.router";

const router = express.Router();

router.use("/film", FilmRouter);

export default router;