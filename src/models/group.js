import mongoose from 'mongoose'
import { Game } from './game'
import { Team } from './team'

const Schema = mongoose.Schema
const GroupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  teams: { type: [Team], required: true },
  games: { type: [Game], required: false },
})

export default mongoose.model('group', GroupSchema)
