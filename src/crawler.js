/**
 *
 *
 * 成語大全 http://big5.chengyudaquan.org/cy0/1~30897.html
 */
const request = require("request-promise-native");
const cheerio = require("cheerio");
const Util = require("./utli");
const PinyinHelper = require("./pinyinHelper");
const WordModel = require("../models/WordModel");

class Crawler {
  static getPage(url, options) {
    return request.get({
      url,
      transform: function(body) {
        return cheerio.load(body);
      },
      ...options
    });
  }
  static parsePage(page) {
    return cheerio.load(page);
  }
  static async crawlerIdiom() {
    const generator = genNumberRange(1, 20);
    const wordsPerCrawl = 10;
    const crawlAndAddWords = async () => {
      const urls = [];
      let val = 0;
      for (let i = 0; i < wordsPerCrawl; i++) {
        val = generator.next().value;
        console.log(i, val)
        if (val === undefined) break;
        const $ = await this.getPage(
          `http://big5.chengyudaquan.org/cy0/${val}.html`
        );
        const text = $(".title1").text();
        const word = PinyinHelper.parsePinyin(text);
        const result = await WordModel.addWord({ ...word, idiom: true, length:text.length });
        // console.log(result);
      }
      if (val === undefined) {
        console.log("Job Done!");
        setTimeout(() =>clearInterval(taskID), 500);
      }
    };
    const taskID = setInterval(crawlAndAddWords, 2000);
    // await crawlAndAddWords();
  }
}
const c = new Crawler({
  maxConnections: 10,
  callback: function(err, res, done) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      const $ = res.$;
      const text = $(".title1").text();
    }
  }
});
function* genNumberRange(start = 0, end = 9) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
// let x = genNumberRange(1, 6);
// console.log(x.next(1).value);
// console.log(x.next(1).value);
// console.log(x.next());

// const crawler = new Crawler();
// Crawler.crawlerIdiom();


module.exports = Crawler;