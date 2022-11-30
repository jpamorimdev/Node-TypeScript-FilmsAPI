import Film, { IFilm } from "../models/Film";
import { clamp } from "../utils/clamp";

interface ListReponse {
  limit: number;
  offset: number;
  data: IFilm[];
}

export default class FilmController {
  public static async list(params: {limit: number, offset: number}): Promise<ListReponse> {
    let { limit, offset } = params;

    // null check, default values and clamping
    limit = parseInt((+(limit || 5)).toString());
    offset = parseInt((+(offset || 0)).toString());
    limit = clamp(limit, 1, 100);
    offset = clamp(offset, 0, 1000);

    const films = await Film.find().limit(limit).skip(offset);
    return {limit, offset, data: films};
  }
}