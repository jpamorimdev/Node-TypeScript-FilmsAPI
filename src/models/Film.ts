import {
  Model, Schema, model, Document
} from 'mongoose';

export interface IFilm extends Document {
  id: string;
  title: string;
  original_title: string;
  description: string;
  release_date: string;
  rt_score: string;
}

interface IFilmModel extends Model<IFilm> { }

const schema = new Schema<IFilm>({
  id: { type: String, index: true, required: true, unique: true },
  title: { type: String },
  original_title: { type: String },
  description: { type: String },
  release_date: { type: String },
  rt_score: { type: String },
}, { timestamps: true });

const Film: IFilmModel = model<IFilm, IFilmModel>('Film', schema);

export default Film;
