import mongoose from 'mongoose'
import { Team } from './team'

const Schema = mongoose.Schema

export const GameSchema = new Schema({
  awayTeam: { type: [Team], required: true },
  datetime: { type: String, required: true },
  finished: { type: Boolean, required: true },
  homeTeam: { type: [Team], required: true },
  matchURI: { type: String, required: false },
  score: { type: String, required: true },
  stadium: { type: String, required: false },
  status: { type: String, required: true },
  teamAId: { type: String, required: false },
  teamBId: { type: String, required: false },
  venue: { type: String, required: false },
})

export default mongoose.model('game', GameSchema)
