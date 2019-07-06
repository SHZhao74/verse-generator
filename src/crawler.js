/**
 *
 *
 * 成語大全 http://big5.chengyudaquan.org/cy0/1~30897.html
 */
const request = require("request-promise-native");
const cheerio = require("cheerio");
const CrawlerNPM = require('crawler');
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
    const generator = genNumberRange(1, 100);
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
        console.log(text, result);
      }
      if (val === undefined) {
        console.log("Job Finish!");
        setTimeout(() =>clearInterval(taskID), 500);
      }
      console.log('Job Done once')
    };
    const taskID = setInterval(crawlAndAddWords, 8000);
    // await crawlAndAddWords();
  }
  static crawlerIdiom2() {
    const generator = genNumberRange(1, 100);
    const c = new CrawlerNPM({
      // maxConnections: 10,
      rateLimit: 1000,
      callback: function(err, res, done) {
        if (err) {
          console.error(err);
          throw err;
        } else {
          const $ = res.$;
          const text = $(".title1").text();
          const word = PinyinHelper.parsePinyin(text);

          WordModel.addWord({
            ...word,
            idiom: true,
            length: text.length
          }).then(result => {
            console.log(text, result);
            done()
          });
        }
      }
    });
    // for (let i = 0; i < 100 / 10; i++){
      const urls = [];
      for (let j = 0; j < 100; j++){
        urls.push(`http://big5.chengyudaquan.org/cy0/${generator.next().value}.html`);
      }
      // console.log(i)
      c.queue(urls);
    // }
  }
}
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