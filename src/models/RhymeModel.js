import mongoose from 'mongoose'
import LyricSchema from './LyricSchema'

const RhymeSchema = new mongoose.Schema({
 rhyme:{
   type: [String]
 },
 lyrics: [LyricSchema]
})

RhymeSchema.method.addLyric = (lyric) {
  console.log("This data is:", lyric);
}
export default mongoose.model('Rhyme', LyricSchema)
