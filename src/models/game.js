import mongoose from 'mongoose'
import { Team } from './team'
import { LineupSchema } from './lineup'

const Schema = mongoose.Schema

export const GameSchema = new Schema({
  _id: Schema.Types.ObjectId,
  awayTeam: { type: Schema.Types.ObjectId, ref: 'team' },
  awayTeamLineup: LineupSchema,
  datetime: { type: String, required: true },
  finished: { type: Boolean, required: true },
  homeTeam: { type: Schema.Types.ObjectId, ref: 'team' },
  homeTeamLineup: LineupSchema,
  matchID: { type: Number, required: false },
  matchURL: { type: String, required: false },
  overtime: { type: Boolean, required: false },
  overtimeScore: { type: String, required: false },
  penalties: { type: Boolean, required: false },
  penaltiesScore: { type: String, required: false },
  score: { type: String, required: true },
  stadium: { type: String, required: false },
  status: { type: String, required: true },
  venue: { type: String, required: false },
})

export default mongoose.model('game', GameSchema)
