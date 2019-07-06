const express = require('express');
const Util = require('../src/utli');
const Router = express.Router();

Router.get('/', async (req, res) => {
  try {
    const WordCnt = await Util.getWordCnt();
    res.render('index', { WordCnt})
  } catch (e) {
    console.error(e)
  }
})
Router.get('/add', (req, res) => {
  return res.render('addWord')
})
Router.get('/api/search', async (req, res) => {
  const { txt } = req.query;
  try {
    const { word, result } = await Util.searchRhyme(txt);
    res.render('ryhmeResult', { word, result });
    // await Util.addWordsToDB(txt);
    // console.log({ word, result })
  } catch (e) {
    res.status(400).send(e)
    console.error(e)
  }
})

Router.post('/api/addWord', async (req, res) => {
  const { txt } = req.body;
  try {
    console.log(req.body)
    const result = await Util.addWordsToDB(txt);
    res.render("ryhmeResult", { result });
  } catch (e) {
    res.status(400).send(e);
    console.error(e);
  }
})
module.exports = Router;

(async () => {
    // let r1 = await Util.addWordsToDB(sentence);
    // await Util.rebuildDataBase();
    // console.log('DONE', {r2})
})().catch(e => {
    console.error(e)
});