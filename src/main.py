#encoding=utf-8
import jieba
from xpinyin import Pinyin
import json
import sys
import requests
from bs4 import BeautifulSoup

def getPinyin(input):
    p = Pinyin()
    # jieba.set_dictionary('dict.txt.big')
    txt = jieba.cut(input)
    out = []
    for t in txt:
        print(t)
        # out.append({str(t):p.get_pinyin(str(t))})
        # print(p.get_pinyin(str(t)))
    # print(json.dumps(out))

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
    getPinyin(lyric)

if __name__ == '__main__':
    # getPinyin(sys.argv[1])
    urls = getSongUrl()
    crawLyric(urls)
