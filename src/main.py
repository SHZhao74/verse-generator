#encoding=utf-8
import jieba
from xpinyin import Pinyin
import json
import sys
import requests
from bs4 import BeautifulSoup
import re

def getPinyin(input):
    p = Pinyin()
    txt = jieba.cut(input)
    out = []
    # print(len(list(txt)))
    for t in txt:
        if (len(t) <= 1): continue
        pinyin = p.get_pinyin(str(t))
        obj = {'txt':t, 'pinyin':pinyin} #dict
        out.append(obj)

    with open('data.json', 'w') as pinyinData:
        json.dump(out,pinyinData, ensure_ascii=False, indent=4)



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
    url = urls[0]
    # for url in urls:
    html = requests.get(lyricUrl+url).text
    soup = BeautifulSoup(html, 'html.parser')
    lyric = soup.select("dd.fsZx3")[0].get_text() #只有一個
    lyric = re.sub(r'(\[.{6,8}\])|\W|(更多更詳盡歌詞 在 ※ Mojim.com　魔鏡歌詞網)', '', lyric)
    # lyric = re.split(r'')
    print(lyric)
    # for l in lyric:
    #     print(l)

    getPinyin(lyric)

if __name__ == '__main__':
    getPinyin(sys.argv[1])
    # urls = getSongUrl()
    # crawLyric(urls)
