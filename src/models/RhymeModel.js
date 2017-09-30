import mongoose from 'mongoose'
import { LyricSchema } from './LyricModel'
// const Lyric = new mongoose.scham(LyricSchema)
const RhymeSchema = new mongoose.Schema({
 rhyme:{
   type: String
 },
 words: [LyricSchema]
})

export default mongoose.model('Rhyme', RhymeSchema)
