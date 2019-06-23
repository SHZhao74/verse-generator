const nodejieba = require("nodejieba");
const pinyin = require("pinyin");
const levenshtein = require('js-levenshtein');

// const WordSchema = require('../models/WordModel');
const {RhymeDct} = require('./RhymeTable')
class Util {
    static searchRhyme(txt) {
        // let word = {word:txt}
        const word = Object.assign(txt, this.getPinyin(txt));
        console.log(word)
        console.table(global.words.map(ele => {
            ele.pinD = levenshtein(word.pinyin, ele.pinyin);
            ele.toneD = levenshtein(word.tone, ele.tone);
            ele.vowelD = levenshtein(word.vowel, ele.vowel);
            return ele;
        })
        )
    }

    /**
     * 把一句歌詞依照資料庫的格式轉換成若干個分詞
     * @param {String} lyric
     * @return {Object}
     */
    static parseLyric(lyric) {
        let words = this.cutWord(lyric)
        words = words.map(word => Object({ word }))
        words.forEach(w => {
            const pinyins = this.getPinyin(w.word)
            Object.assign(w, pinyins);
        })
        // console.table(words)
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
    /**
     * 
     * @param {String[]} word
     */
    static getPinyin(word) {
        const rtn = {
            tone: [],
            pinyin: '',
            vowel:''
        }
        const result_TONE2 = pinyin(word, { style: pinyin.STYLE_TONE2 })
        // console.log(result)
        // rtn.tone = result.map(r => r[0].slice(-1)); // get last chart in string
        result_TONE2.forEach(r => {
            rtn.pinyin += r[0]
            rtn.tone += r[0].slice(-1) //test
        })

        //子音 (Consonant)
        const result_INITIALS = pinyin(word, { style: pinyin.STYLE_INITIALS }) //不會顯示y-w-yu等聲母
        const firstLetter = pinyin(word, { style: pinyin.STYLE_FIRST_LETTER }) //改用第一個字代替
        rtn.consonant = result_INITIALS.map((r, i) => {
            if (r[0]) return r[0]
            return firstLetter[i][0]
        });
        result_TONE2.forEach((r, i) => {
            const tmp = r[0].replace(rtn.consonant[i], '')
            // console.log(tmp)
            rtn.vowel += tmp.slice(0,-1)
        })
        // let result = sentence.map(r => pinyin(r, { style: pinyin.STYLE_TONE2 }))
        return rtn;
    }
    /**
     * 
     * @param {String[]} pinyin 
     */
    static pairRhyme(pinyin) {
        const r = []
        for (let i in pinyin) {
            let p = pinyin[i][0]
            while (true) {
                console.log(p);
                if (p.length === 0) break
                const token = RhymeDct[p]
                if (token) {
                    r.push(token)
                    break
                }
                p = p.slice(1, p.length)
            }
        }
        // print(r, len(r), len(pin))
        if (r.length == pinyin.length)
            // print( '-'.join(r))
            return r.join('-')
    }
}
module.exports = Util;