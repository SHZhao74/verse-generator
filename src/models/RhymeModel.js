import mongoose from 'mongoose'
import { LyricSchema } from './LyricModel'
// const Lyric = new mongoose.scham(LyricSchema)
const RhymeSchema = new mongoose.Schema({
 rhyme:{
   type: String
 },
 words: [LyricSchema]
})
RhymeSchema.methods.findSameRhyme = (cb) => this.model('Rhyme').findOne({rhyme: this.rhyme}, cb)

RhymeSchema.methods.isWordExist = (word, cb) =>
  this.model('Rhyme').findOne({words: { $elemMatch: {word}}}, cb)


export default mongoose.model('Rhyme', RhymeSchema)
