// import mongoose from 'mongoose'
// import Lyric from './models/LyricModel'
// import express from 'express'
// import bodyParser from 'body-parser'
const Util = require('./src/utli');
var pinyin = require("pinyin");

var result;

var sentence = "我們不禁哄堂大笑，同樣的一件衣料，每個人卻有不同的感覺，炸掉。";
const searchTxt = '罵俏'

// console.log(Util.cutWord(searchTxt))
global.words = Util.parseLyric(sentence)
// let pin = Util.getPinyin(result)
// let ryh = Util.pairRhyme(pin)

console.log(Util.searchRhyme(searchTxt));

// const app = express()
// const port = process.env.PORT || 3001
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var routes = require('./routes/LyricRouter');
// routes(app);

// app.listen(port);

// console.log('Lytic RESTful API server started on: ' + port);
// // import PythonShell from 'python-shell'
// //
// // // const py = PythonShell('./main.py', (err)=>{if (err)throw err;console.log(err);})
// // const options = {
// //   mode: 'json',
// //   args:['你有意見就當面吼']
// // };
// //
// // PythonShell.run('src/main.py', options, (err, result) => {
// //   if (err){
// //     console.log('QQQQQQQ:',err);
// //     throw err;
// //   }
// //     return console.log('result:', result);
// // });
// // console.log('123');
