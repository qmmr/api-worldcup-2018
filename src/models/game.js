import mongoose from 'mongoose'
import { Team } from './team'

const Schema = mongoose.Schema

export const GameSchema = new Schema({
  _id: Schema.Types.ObjectId,
  awayTeam: { type: Schema.Types.ObjectId, ref: 'team' },
  datetime: { type: String, required: true },
  finished: { type: Boolean, required: true },
  homeTeam: { type: Schema.Types.ObjectId, ref: 'team' },
  matchURI: { type: String, required: false },
  score: { type: String, required: true },
  stadium: { type: String, required: false },
  status: { type: String, required: true },
  venue: { type: String, required: false },
})

export default mongoose.model('game', GameSchema)
