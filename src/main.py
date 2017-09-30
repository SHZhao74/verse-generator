# -*- coding: utf8 -*-
import jieba
from xpinyin import Pinyin
import json
import sys
import requests
from bs4 import BeautifulSoup
import re



# class Rhyme
def getWords(lyric):
    words = jieba.cut(lyric)
    return [i for i in words if len(i) > 1]

def pairRhyme (pin):
    from RhymeTable import RhymeDct
    r = []
    for i in pin:
        while True:
            if not i:
                break
            token = RhymeDct.get(i, None)
            if token:
                r.append(token)
                break
            i = i[1:]
    # print(r, len(r), len(pin))
    if len(r) == len(pin):
        # print( '-'.join(r))
        return '-'.join(r)

def getPinyin(words, num):
    wordCnt = 0 #紀錄總共幾個詞
    p = Pinyin()
    out = []
    # print(len(list(txt)))
    for  t in words:
        if (len(t) <= 1): continue
        pinyin = p.get_pinyin(str(t)).split('-')
        rhyme = pairRhyme(pinyin)
        # print('word:', t, 'pinyin:', pinyin, 'rhyme:', rhyme)
        # print(pinyin)
        out.append({'word':str(t), 'rhyme':rhyme})
    wordCnt += len(words)
    print('字數:', wordCnt)
    with open('data/song'+str(num)+'.json', 'w') as pinyinData:
        json.dump(out, pinyinData, ensure_ascii=False, indent=4)



lyricUrl = 'https://mojim.com'
hotSongUrl = 'https://mojim.com/twzhot-song.htm'
def getSongUrl():
    urls = []
    html = requests.get(hotSongUrl).text
    soup = BeautifulSoup(html, 'html.parser')
    # print(soup.find(id="mx5_A").table.find_all('a').get('href'))
    for div in soup.find_all(id="mx5_A")[0:3]:
        for link in div.find_all('a'):
            urls.append(link.get('href'))
            # print(link.get('href'))
    return urls
def crawLyric(urls):
    # url = urls[0]
    for i, url in enumerate(urls[0:3]):
        # if i>3: break
        html = requests.get(lyricUrl+url).text
        soup = BeautifulSoup(html, 'html.parser')
        try:
            lyric = soup.select("dd.fsZx3")[0].get_text() #只有一個
        except Exception as e:
            print('error in crawl ', urls[i])
        lyric = re.sub(r'(\[.{6,8}\])|\W|(更多更詳盡歌詞 在 ※ Mojim.com　魔鏡歌詞網)|的', ' ', lyric)
    # lyric = re.split(r'')
    # print(lyric)
    # for l in lyric:
    #     print(l)

        getPinyin(getWords(lyric), i)

if __name__ == '__main__':
    # words = getWords(sys.argv[1].encode('utf-8'))
    # getPinyin(words,0)
    print('get urls')
    urls = getSongUrl()
    print('crawl Lyric')
    crawLyric(urls)
