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

//押韻歸類表
const RhymeDct = {
    'a': '1', 'ua': '1', 'ia': '1',// ㄚ ㄧㄚ ㄨㄚ
    'ai': '2', 'uai': '2', // ㄞ ㄨㄞ
    'uan': '3', 'an': '3', //ㄨㄢ ㄢ
    'uang': '4', 'ang': '4', 'iang': '4',
    'ao': '5', 'iao': '5',
    'e': '6',
    
  'ui': '7',
  'ei': '7', //沒
    'ue': '7', //ㄩㄝ 絕學
  // 'wei': '7',  

  'en': '8', 'un': '8',
  'eng': '8', //ㄔㄥ, ㄓㄥ
  //'wen':'8', //ㄨㄣ

  'in': '9', //ㄧㄣ 
  'ing': '9', //ㄧㄥ
  'iong': '9',

  'er': '10',
    
  'i': '11', //ㄐㄧ
  'yi': '11', //氣力, 益
  
  'ye': '12',
  'ie': '12', //ㄧㄝ
  'ian': '12', //ㄧㄢ
    
  'iu': '13', //修 揪
  'ou': '13', 'o': '13',
  'uo': '13',//鄒
  'you': '13', 'wo': '13', //優 窩
  'ong': '13', //空衝

    'u': '14', 'wu': '14',
    'qu': '15', 'xu': '15', 'yu': '15', 'ju': '15',
  'zhi': '16', 'chi': '16', 'shi': '16', 'ri': '16', //至赤是日
  'zi': '16', 'ci': '16', 'si':'16', //自次四
}
/**
 * 在同音調時有押韻:
 * in(9)跟i(11) 金 雞
 * ie(ㄧㄝ)跟ian(ㄧㄢ) 鞋帶 年代 厭世 夜市
 */
module.exports = {
  RhymeTable,
RhymeDct}
