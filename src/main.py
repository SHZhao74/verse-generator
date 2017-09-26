import jieba
from xpinyin import Pinyin
import json
import sys

def getPinyin(input):
    p = Pinyin()
    txt = jieba.cut(input)
    out = []
    for t in txt:
        out.append({str(t):p.get_pinyin(str(t))})
        # print(p.get_pinyin(str(t)))
    print(json.dumps(out))

if __name__ == '__main__':
    getPinyin(sys.argv[1])
