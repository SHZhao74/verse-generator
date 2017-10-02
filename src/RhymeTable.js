const RhymeTable = [
  {chinese: ['佳', '麻'], rhyme:['a','ia','ua']},
  {chinese: ['開', '來'], rhyme:['ai','uai']},
  {chinese: ['先', '寒'], rhyme:['an', 'ian', 'uan', 'üan']},
  {chinese: ['江', '陽'], rhyme:['ang','iang','uang']},
  {chinese: ['逍', '遥'], rhyme:['ao','iao']},
  {chinese: ['國', '歌'], rhyme:['e','o','uo']},
  {chinese: ['灰', '微'], rhyme:['ei','ui']},
  {chinese: ['森', '林'], rhyme:['en','in','un', 'ün']},
  {chinese: ['冬', '青'], rhyme:['eng', 'ing', 'ong', 'iong']},
  {chinese: ['稀', '奇'], rhyme:['i']},
  {chinese: ['詩', '詞'], rhyme:['shi', 'zhi', 'ci', 'si']},
  {chinese: ['跌', '別'], rhyme:['ie']},
  {chinese: ['憂', '愁'], rhyme:['ou', 'iu']},
  {chinese: ['讀', '書'], rhyme:['u']},
  {chinese: ['魚', '需'], rhyme:['ü']},
  {chinese: ['絕', '學'], rhyme:['üe']},
]
const RhymeDct = {
    'a': '1', 'ua': '1', 'ia': '1',
    'ue': '16',
    'ai': '2', 'uai': '2',
    'uan': '3', 'ian':'3', 'an': '3',
    'uang': '4', 'ang': '4', 'iang': '4',
    'ao': '5', 'iao': '5',
    'uo': '13', 'e': '6',
    'ui': '7', 'ei': '7',
    'en':'8', 'in': '8', 'un': '8',
    'ing': '9', 'eng': '9', 'ong': '9', 'iong': '9',
    'er': '10',
    'i': '11',
    'ye': '12','ie': '12',
    'iu': '13', 'ou': '13', 'o': '13',
    'u': '14',
    'qu': '15', 'xu': '15', 'yu': '15', 'ju': '15',
    'shi':'16', 'zi': '16', 'zhi': '16', 'ci': '16', 'ri': '16' //知吃虱ㄖ資ㄘㄙ
}
const pairRhyme = (pin) => {
  const r = []
  for (let i in pin){
    let p = pin[i][0]
    while(true){
      // console.log(p);
      if (p.length === 0)break
      const token = RhymeDct[p]
      if(token){
        r.push(token)
        break
      }
      p = p.slice(1, p.length)
    }
  }
  // print(r, len(r), len(pin))
  if(r.length == pin.length)
      // print( '-'.join(r))
      return r.join('-')
}
export default pairRhyme;
