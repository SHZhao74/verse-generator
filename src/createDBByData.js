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
const addWord = function(lyric) {
  const {word, rhyme} = lyric
  RhymeModel.findOne({rhyme: rhyme}, (err, result) => {
    if (err) return handleError(err);
    if (result === null) {
      const new_lyric = new LyricModel({word: word});
      const new_rhyme = new RhymeModel({rhyme: rhyme, words:[new_lyric]})
      new_rhyme.save((err, rhy) => {
        if (err) return handleError(err);
        console.log('save result:', rhy);
      })
    }
  })
    // new_lyric.save(function(err, lyric) {
    //     if (err)
    //         res.send(err);
    //     res.json(lyric);
    // });
};
const getJSON = (files) => {
  for (var f in files) {
    // console.log(files[f]);
    fs.readFile(`${BASE_PATH}${files[f]}`, (err, data) => {
      const words = JSON.parse(iconv.decode(data, 'big5'))
      for (var i in words) {
        console.log(words[i]);
        addWord(words[i])
      }
    })
  }
}

fs.readdir(BASE_PATH, (err, files) => {
  if(err) throw err;
  console.log(files);
  getJSON(files)

})
