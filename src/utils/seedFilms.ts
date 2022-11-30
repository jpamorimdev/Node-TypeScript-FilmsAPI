import Film from "../models/Film";
import axios from 'axios';
import Pako from "pako";

async function getFilms() {
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
}

async function deleteAllFilms() {
  await Film.deleteMany({});
}

export const seedFilms = async () => {
  await deleteAllFilms();
  const films = await getFilms();
  for (let film of films) {
    const newFilm = new Film(film);
    await newFilm.save();
  }
}