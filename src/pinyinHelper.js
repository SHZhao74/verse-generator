/**
 * 專門處理拼音跟韻腳
 */
const Pinyin = require("pinyin");
const { RhymeDct} = require('./RhymeTable');


module.exports = class PinyinHelper {
    static parsePinyin(word) {
        const rtn = { word };
        rtn.consonant = this.getConsonant(word);
        Object.assign(rtn, this.getToneAndPinyin(word));
        rtn.vowel = this.getVowel(rtn);
        rtn.vowelType = this.getVowelType(rtn);
        return rtn;
    }

    //子音 (Consonant)
    static getConsonant(word) {
        let consonant = [];
        const result_INITIALS = Pinyin(word, { style: Pinyin.STYLE_INITIALS }) //不會顯示y-w-yu等聲母
        // const firstLetter = Pinyin(word, { style: Pinyin.STYLE_FIRST_LETTER }) //改用第一個字代替
        result_INITIALS.forEach((r, i) => {
            // if (r[0])
                consonant.push(r[0])
            // else consonant.push(firstLetter[i][0])
        });
        return consonant;
    }

    static getToneAndPinyin(word, TONE2) {
        let pinyin = [], tone = [];
        // if(!TONE2)
        const result_TONE2 = Pinyin(word, { style: Pinyin.STYLE_TONE2 })
        // console.log(result)
        // rtn.tone = result.map(r => r[0].slice(-1)); // get last chart in string
        result_TONE2.forEach(r => {
            pinyin.push(r[0])
            let number = r[0].match(/[0-9]/g);
            tone.push(number? number[0]: '0' );
        })
        return { pinyin, tone };
    }

    /**
     * 韻母
     * @param {*} param0 
     */
    static getVowel({ word, consonant, pinyin }) {
        let vowel = pinyin.map((py, i) => {
            
            let p = py.replace(/[0-9]/g, '');
            if (RhymeDct[p]) return p
            if ('wy'.includes(p[0])) return p.slice(1, p.length); //ㄧㄥ=ying, ㄩㄥ=yong
            p = p.replace(consonant[i], '');
            return p
        })
        //  = pinyin.replace(/[0-9]/g, '');
        // console.log(consonant)
        // consonant.forEach(c => vowel = vowel.replace(c, ''))
        // console.log(vowel)
        return vowel;
    }
    // static getVowel(word='') {
        
    // }
    /**
     * 韻腳歸類
     * @param {*} param0 
     */
    static getVowelType({ vowel }) {
        let rtn = []
        vowel.forEach(v => rtn.push(RhymeDct[v]))
        return rtn;        
    }
}