# GAYA
![](public/img/logo2.png)
> Verse generator

## Feature
* Support mactching Chinese word Rhyme
* Multiple words matching
* Lyric website Crawler

## Flowchart
1. Word Segmentation 分詞
2. Deduplication 去重
3. Tokenazation
   1. Rhyme classification 韻腳歸類
   2. Analysis vowels, consonants, and tones 拆分子音, 母音, 聲調
4. store to DB


## TODO
1. Improve matching accuracy.
2. Support English vocabulary Rhyme matching.
3. Crawl lyrical web and compute freqency of vocabulary.
4. Using Keras to automatically recommand Rhyme word or compose the whole sentence.
5. Maybe I can make [Google TTS](https://soundoftext.com/) (谷歌小姐) sing for us, lamo.
