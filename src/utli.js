const nodejieba = require("nodejieba");
const levenshtein = require('js-levenshtein');
const OpenCC = require('opencc');
const WordModel = require('../models/WordModel');
const PinyinHelper = require('./pinyinHelper');
const { RhymeDct } = require('./RhymeTable')

const opencc = new OpenCC('s2tw.json')
// opencc.(OpenCC.COVERSERION_FAST);

class Util {
    /**
     * 依給定的字彙搜尋押韻的詞彙
     * @param {String} txt 
     */
    static async searchRhyme(txt) {
        const word = Object.assign({word:txt}, PinyinHelper.parsePinyin(txt));
        // console.log(word)
        //word.vowelType.map(vt => Object({ vowelType: { $in: vt } }))
        const query = {}
        /**
         * 雙韻找雙押：.0 .1, 三押： .1 .2 四：.2 .3
         * 三韻找三押: .0 .1 .2 四押: .1 .2 .3, 雙押: .1 .2-> .0 .1
         */
        //以下會產生出{vowelType.0: '9', vowelType.1: '3'}
        word.vowelType.forEach((vt, i) => {
            query[`vowelType.${i}`] = vt
        })
        try {
            const result = await WordModel.find(query, {_id: false, __v:false, length: false}).lean()
            // console.table(result)
            return {word, result};
        } catch (e) {
            console.error(e)
        }
        // console.table(global.words.map(ele => {
        //     ele.pinD = levenshtein(word.pinyin, ele.pinyin);
        //     ele.toneD = levenshtein(word.tone, ele.tone);
        //     ele.vowelD = levenshtein(word.vowel, ele.vowel);
        //     return ele;
        // })
        // )
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
            
        } catch (e) {
            console.error(e)
        }
    }
    /**
     * 把一句歌詞依照資料庫的格式轉換成若干個分詞
     * @param {String} lyric
     * @return {Object[]}
     */
    static parseLyric(lyric) {
        let words = typeof lyric === 'string' ? this.cutWord(lyric) : [lyric.word];
        // words = words.map(word => Object({ word }))
        // console.log(words)
        words = words.map(w => {
            const pinyins = PinyinHelper.parsePinyin(w)
            return Object.assign({word: w}, pinyins, {length: w.length});
        })
        console.table(words)
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
        result = result.concat(nodejieba.cutHMM(sentence))
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
            console.time('rebuild')
            for (let i = 0; i < len / count; i++) {
                let words = await WordModel.find({},'word').skip(i * count).limit(count);
                const newWords = words.map(w => {
                    const new_w = this.parseLyric(w);
                    return Object.assign(w, new_w[0]);
                })
                await newWords.forEach(async w => await WordModel.addWord(w));
            }
            console.timeEnd('rebuild');
        } catch (e) {
            // console.error(e)
            throw e
        }
    }
    static async getWordCnt() {
        return await WordModel.countDocuments({});
    }
}
module.exports = Util;