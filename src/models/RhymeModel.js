import mongoose from 'mongoose'
import { LyricSchema } from './LyricModel'
// const Lyric = new mongoose.scham(LyricSchema)
const RhymeSchema = new mongoose.Schema({
 rhyme:{
   type: String
 },
 words: [LyricSchema]
})
RhymeSchema.methods.findSameRhyme = function(cb){
   this.model('Rhyme').findOne({rhyme: this.rhyme}, cb)
}

RhymeSchema.methods.isWordExist = function(word, cb) {
  this.model('Rhyme').findOne({words: { $elemMatch: {word}}}, cb)
}

RhymeSchema.methods.addWord = function(newWord, cb){
  this.update({ $push: { words: newWord } }, (err, result) => {
    if(err) return console.error(err)
    console.log('new word:', newWord)
  })
}
export default mongoose.model('Rhyme', RhymeSchema)
