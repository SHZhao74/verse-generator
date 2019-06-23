const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
	word: String,
	pinyin: String,
	tone: [String],
	consonant: [String],
	vowel: [String]
});

// export LyricSchema
export default mongoose.model('Word', LyricSchema)
