import mongoose from 'mongoose'
import { Coach, CoachSchema } from './coach'

const Schema = mongoose.Schema

export const LineupPlayer = new Schema({
  countrycode: { type: String, required: false },
  jerseyNum: { type: String, required: true },
  photo: { type: String, required: true },
  playerId: { type: Number, required: true },
  playerName: { type: String, required: true },
  playerRole: { type: String, required: false },
  playerURL: { type: String, required: true },
})

export const LineupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  coach: CoachSchema,
  flag: { type: String, required: false },
  lineup: [LineupPlayer],
  // [{ type: Schema.Types.ObjectId, ref: 'player' }], // FIXME: When players are ready change this to fetch Players
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  substitutes: [LineupPlayer],
  teamId: { type: String, required: true },
})

export default mongoose.model('lineup', LineupSchema)
