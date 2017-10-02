import mongoose from 'mongoose'
import RhymeModel from './models/RhymeModel'
import LyricModel from './models/LyricModel'
import fs from 'fs'
import iconv from 'iconv-lite'
const BASE_PATH = './src/data/'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

// const Lyric = mongoose.model('Lyric')
// const Rhyme = mongoose.model('Rhyme')
const pushNewWord = (newWord, rhyme) => {
  RhymeModel.update(rhyme, { $push: { words: newWord } }, (err, result) => {
    if(err) return console.error(err)
    console.log('new word:', newWord)
  })
}
const addWord = function(lyric) {
  console.log(lyric)
  const {word, rhyme} = lyric
  // 先找這組詞彙是否已經存在
  RhymeModel.findOne({words: {
    $elemMatch: {word:word}
  }}, (err, result) => {
    if (err) return console.error(err);
    console.log('word findOne result:', result)
    const new_lyric = new LyricModel({word: word});
    if (result === null) { //不存在 則檢查是否有此組運腳
      RhymeModel.findOne({rhyme}, (err, result) =>{
        if (err) return console.error(err);
        // console.log('Rhyme findOne result:', result)
        if (result === null) { //此組運繳不存在，新增一個
          const new_rhyme = new RhymeModel({rhyme: rhyme, words:new_lyric})
          new_rhyme.save((err, rhy) => {
            if (err) return handleError(err);
            console.log('new Rhyme:', rhyme);
          })
        }else
        pushNewWord(new_lyric, rhyme)
      })
    }else console.log('Wrod Duplicate')
  })
};
const tmp = (word)=>()=>addWord(word)
const getJSON = (files) => {
  for (var f in files) {
    // console.log(files[f]);
    fs.readFile(`${BASE_PATH}${files[f]}`,async (err, data) => {
      const words = JSON.parse(iconv.decode(data, 'big5'))
      console.log(words);
      for (var i in words) {
        // console.log(words[i]);
        setTimeout(tmp(words[i]), i*10)
      }
    })
  }
}

// fs.readdir(BASE_PATH, (err, files) => {
//   if(err) throw err;
//   console.log(files);
//   getJSON(files)
//
// })

process.argv.forEach((val, index, array) =>{
  console.log('val:', val,'index:', index, 'array:',array);
})
