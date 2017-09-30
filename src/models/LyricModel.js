import mongoose from 'mongoose'

export const LyricSchema = new mongoose.Schema({
	word: String,
	pinyin: String
});

// export LyricSchema
export default mongoose.model('Lyrics', LyricSchema)
