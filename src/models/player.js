import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const PlayerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  countrycode: { type: String, required: false },
  jerseyNum: { type: String, required: false },
  photo: { type: String, required: false },
  playerId: { type: Number, required: false },
  playerName: { type: String, required: true },
  playerRole: { type: String, required: false },
  playerURL: { type: String, required: true },
})

export default mongoose.model('player', PlayerSchema)
