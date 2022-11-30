import Film from "../models/Film";
import axios from 'axios';
import Pako from "pako";
import logger from "../lib/logger";

async function getFilms() {
  try {
    let queryParams = {
      limit: "200",
      fields: ["id", "title", "original_title", "description", "release_date", "rt_score"].toString(),
    };

    let url = "https://ghibliapi.herokuapp.com/films?" + new URLSearchParams(queryParams).toString();

    const { data: compressedData } = await axios.get(
      url,
      {
        responseType: 'arraybuffer'
      },
    );

    // decompress gzip response from third party api

    let stringData = Pako.ungzip(compressedData, { to: 'string' });

    let data = JSON.parse(stringData);

    return data;
  } catch (error) {
    logger.error(`Failed to get films list from third party API: ${error}`);
    throw error;
  }
}

async function deleteAllFilms() {
  await Film.deleteMany({});
}

export const seedFilms = async () => {
  try {    
    const films = await getFilms();
    await deleteAllFilms();
    for (let film of films) {
      const newFilm = new Film(film);
      await newFilm.save();
    }
  } catch (error) {
    logger.error(`Failed to seed films: ${error}`);
  }
}