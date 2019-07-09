const nodejieba = require("nodejieba");
const levenshtein = require("js-levenshtein");
const OpenCC = require("opencc");
const WordModel = require("../models/WordModel");
const PinyinHelper = require("./pinyinHelper");
const { RhymeDct } = require("./RhymeTable");
const Config = require('../config');
const opencc = new OpenCC("s2tw.json");
// opencc.(OpenCC.COVERSERION_FAST);

class Util {
  /**
   * 依給定的字彙搜尋押韻的詞彙
   * @param {String} txt
   */
  static async searchRhyme(txt) {
    const word = Object.assign({ word: txt }, PinyinHelper.parsePinyin(txt));
    const query = [];

    /**
     * 雙韻找雙押：.0 .1, 三押： .1 .2 四：.2 .3
     * 三韻找三押: .0 .1 .2 四押: .1 .2 .3, 雙押: .1 .2-> .0 .1
     */
    for (let i = 2; i <= Config.MAX_MATCH_WORD_LENGTH; i++) {
      const q = { length: i };
      word.vowelType.forEach((vt, j) => {
        const index = j + (i - txt.length);
        if (index >= 0) q[`vowelType.${index}`] = word.vowelType[j];
      });
      query.push(q);
    }
    // console.log(query);
    try {
      let result = await WordModel.find(
        { $or: query },
        { _id: false, __v: false, length: false }
      ).lean();
      result = this.scoreRhyme(word, result);
      console.table(result)
      return { word, result };
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * 根據搜尋字眼評斷押韻程度
   * @param {Word} search
   * @param {Word[]} words
   */
  static scoreRhyme(search, words) {
    let { tone, consonant } = search;
    tone = tone.reverse();
    consonant = consonant.reverse();
    words.forEach((word, index, arr) => {
      let score = search.word.length;
      const t = [...word.tone].reverse() //先copy再反轉
      const c = [...word.consonant].reverse()
      search.vowelType.forEach((w, i) => {
        if (t[i] === tone[i] ) score+=1.5;  
        if (c[i] === consonant[i] ) score++;        
      })
      word.score = score / (2.5 * search.word.length);
    })
    return words.sort((a, b) => b.score - a.score);
  }
  /**
   * 新增一個或多個字彙進資料庫
   * @param {String} lyric
   */
  static async addWordsToDB(lyric) {
    try {
      // console.log(await WordModel.find())
      let words = opencc.convertSync(lyric); //簡體轉繁體
      words = this.parseLyric(words);
      // console.table(words)
      await words.forEach(async w => await WordModel.addWord(w));
      return words;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  /**
   * 把一句歌詞依照資料庫的格式轉換成若干個分詞
   * @param {String} lyric
   * @return {Object[]}
   */
  static parseLyric(lyric) {
    let words;
    if (typeof lyric === "string") {
      words = lyric.replace(/[a-z|A-Z|0-9]/g, "");
      words = this.cutWord(words);
    } else words = [lyric.word];
    // words = words.map(word => Object({ word }))
    // console.log(words)
    words = words.map(w => {
      const pinyins = PinyinHelper.parsePinyin(w);
      return Object.assign({ word: w }, pinyins, { length: w.length });
    });
    // console.table(words);
    return words;
  }

  /**
   * 預先定義好的斷詞，並濾掉一個字的元素
   * @param {String} sentence
   * @return {String[]}
   */
  static cutWord(sentence) {
    let result = nodejieba.cutAll(sentence);
    // result = new Set(result, nodejieba.cutHMM(sentence))
    result = result.concat(nodejieba.cutHMM(sentence));
    result = result.filter(r => r.length >= 2);
    result = Array.from(new Set(result)); //去重
    // console.log(result)
    return result;
  }

  static async rebuildDataBase(option) {
    try {
      let len = await WordModel.countDocuments();
      const count = 200;
      console.log(`重建資料庫中....共${len}個詞彙要處理`);
      console.time("rebuild");
      for (let i = 0; i < len / count; i++) {
        let words = await WordModel.find({}, "word")
          .skip(i * count)
          .limit(count);
        const newWords = words.map(w => {
          const new_w = this.parseLyric(w);
          return Object.assign(w, new_w[0]);
        });
        await newWords.forEach(async w => await WordModel.addWord(w));
      }
      console.timeEnd("rebuild");
    } catch (e) {
      // console.error(e)
      throw e;
    }
  }
  static async getWordCnt() {
    return await WordModel.countDocuments({});
  }
}


module.exports = Util;
