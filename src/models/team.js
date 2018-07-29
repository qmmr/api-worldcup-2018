import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TeamSchema = new Schema({
  _id: Schema.Types.ObjectId,
  emoji: { type: String, required: false },
  emojiString: { type: String, required: false },
  flag: { type: String, required: false },
  games: [{ type: Schema.Types.ObjectId, ref: 'game' }],
  iso2: { type: String, required: false },
  name: { type: String, required: false },
  shortName: { type: String, required: false },
  teamID: { type: String, required: true },
  teamURL: { type: String, required: true },
})

export default mongoose.model('team', TeamSchema)
