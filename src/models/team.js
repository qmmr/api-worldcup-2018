import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  emoji: { type: String, required: false },
  emojiString: { type: String, required: false },
  flag: { type: String, required: false },
  iso2: { type: String, required: false },
  name: { type: String, required: false },
  shortName: { type: String, required: false },
})

export default mongoose.model('team', TeamSchema)
