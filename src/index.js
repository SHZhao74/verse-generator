import mongoose from 'mongoose'
import Lyric from './models/LyricModel'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3001
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/LyricRouter');
routes(app);

app.listen(port);

console.log('Lytic RESTful API server started on: ' + port);
// import PythonShell from 'python-shell'
//
// // const py = PythonShell('./main.py', (err)=>{if (err)throw err;console.log(err);})
// const options = {
//   mode: 'json',
//   args:['你有意見就當面吼']
// };
//
// PythonShell.run('src/main.py', options, (err, result) => {
//   if (err){
//     console.log('QQQQQQQ:',err);
//     throw err;
//   }
//     return console.log('result:', result);
// });
// console.log('123');
