import express, { Request, Response } from "express";
import FilmController from "../controllers/film.controller";

const router = express.Router();

/**
 * @openapi
 * '/api/film/list':
 *  get:
 *     tags:
 *     - Films
 *     summary: Get the films list retrieved from the database
 *     parameters:
 *      - name: limit
 *        in: query
 *        description: Limit the number of films to retrieve
 *        required: false
 *      - name: offset
 *        in: query
 *        description: Offset the number of films to retrieve
 *        required: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties: 
 *              limit:
 *               type: number
 *              offset:
 *                type: number
 *              data:
 *               type: array
 *               items: 
 *                $ref: '#/components/schema/Film'
 */

// *              $ref: '#/components/schema/Film'
router.get("/list", async (req: Request, res: Response) => {
  const films = await FilmController.list({ limit: req.query.limit as any, offset: req.query.offset as any });
  res.json(films);
});

export default router;