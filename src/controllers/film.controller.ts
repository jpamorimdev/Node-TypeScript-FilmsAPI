import Film, { IFilm } from "../models/Film";

interface ListReponse {
  limit: number;
  offset: number;
  data: IFilm[];
}

export default class FilmController {
  public static async list(params: {limit: number, offset: number}): Promise<ListReponse> {
    let { limit, offset } = params;

    const films = await Film.find().limit(limit).skip(offset);
    return {limit, offset, data: films};
  }
}