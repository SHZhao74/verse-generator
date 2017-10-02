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
      const pinyin = Pinyin(req.query.word, {style: Pinyin.STYLE_NORMAL})
      const rhyme = pairRhyme(pinyin)
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
exports.list_all_lyrics = function(req, res) {
    Lyric.find({}, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

//CRUD

exports.addWord = function(req, res) {
    var new_lyric = new Lyric(req.query);
		console.error(req.query)
    new_lyric.save(function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
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
