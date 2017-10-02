import mongoose from 'mongoose'
import querystring from 'querystring'
import pyshell from 'python-shell'
import Pinyin from 'pinyin'
// import iconv from 'iconv-lite'
// import fs from 'fs'
import RhymeModel from '../models/RhymeModel'
import LyricModel from '../models/LyricModel'
import pairRhyme from '../RhymeTable'

//針對不同request的回應(json格式)
exports.searchRhyme = (req, res) => {
  // const query = JSON.stringfy(req.query)
  const {word} = req.query;
  RhymeModel.find({words: { //先找這個詞彙是否已經存在
    $elemMatch: {word:word}
  }}, (err, result) => {
    if (err) return console.error(err);
    console.log(result);
    if (result.length){
      res.send(result)
    }
    else { //不存在，則尋找相同韻腳
      const rhyme = getRhyme(word)
      // console.log(rhyme);
      RhymeModel.findOne(rhyme, (err, result) => {
        if (err) return console.error(err);
        if (result) res.send(result)
        else res.send([])
      })
    }
  })
  // pyshell.run('src/main.py', {args:[req.query.word]}, (err, result) => {
  //   if(err)console.error(err);
  //   console.log(result);
  //   fs.readFile(`../data/song0.json`, (err, data) => {
  //     const words = JSON.parse(iconv.decode(data, 'big5'))
  //
  //   // res.send(result)
  // })
}
const getRhyme = (word) => {
  const pinyin = Pinyin(word, {style: Pinyin.STYLE_NORMAL})
  return pairRhyme(pinyin)
}
exports.list_all_lyrics = function(req, res) {
    Lyric.find({}, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

//CRUD
const pushNewWord = (newWord, rhyme) => {
  RhymeModel.update(rhyme, { $push: { words: newWord } }, (err, result) => {
    if(err) return console.error(err)
    console.log('new word:', newWord)
  })
}
exports.addWord = function(req, res) {
  const {word} = req.query;
  const rhyme = getRhyme(word);
  const new_lyric = new LyricModel({word: word});
  const new_rhyme = new RhymeModel({rhyme:rhyme, words:new_lyric})
  // 先找這組詞彙是否已經存在
  new_rhyme.isWordExist(word, (err, result) => {
    if (err) return console.error(err);
    console.log('word findOne result:', result)
    if (result === null) { //不存在 則檢查是否有此組韻腳
      // RhymeModel.findOne(rhyme, (err, result) =>{
      //   if (err) return console.error(err);
      //   // console.log('Rhyme findOne result:', result)
      //   if (result === null) { //此組韻腳不存在，新增一個
      //
      //     new_rhyme.save((err, rhy) => {
      //       if (err) return console.log(err);
      //       console.log('new Rhyme:', rhyme);
      //       res.send(rhyme)
      //     })
      //   }else
      //   pushNewWord(new_lyric, rhyme)
      //   res.send(new_lyric)
      // })
    }else res.send('Wrod Duplicate') //詞彙已存在
  })
};

exports.read_a_lyric = function(req, res) {
    Lyric.findById(req.params.lyricId, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

exports.update_a_lyric = function(req, res) {
    Lyric.findOneAndUpdate(req.params.lyricId, req.body, { new: true }, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

exports.delete_a_lyric = function(req, res) {


    Lyric.remove({
        _id: req.params.lyricId
    }, function(err, lyric) {
        if (err)
            res.send(err);
        res.json({ message: 'Lyric successfully deleted' });
    });
};
