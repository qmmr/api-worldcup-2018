import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const CoachSchema = new Schema({
  _id: Schema.Types.ObjectId,
  coachURL: { type: String, required: true },
  name: { type: String, required: true },
  photo: { type: String, required: false },
})

export default mongoose.model('coach', CoachSchema)
