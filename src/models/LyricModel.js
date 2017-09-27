import mongoose from 'mongoose'

 const LyricSchema = new mongoose.Schema({
	txt:{
		type: String,
		Required: 'need lyric~'
	},
	pinyin: {
		type: String,
		Required: 'need pinyin~'
	}
})
export default mongoose.model('Lyrics', LyricSchema)
