const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
	word: String,
	length: Number,
	pinyin: [String],
	tone: [String],
	consonant: [String],
	vowel: [String],
	vowelType: [String],
	idiom: {
		type: Boolean,
		default: false
	}
});
/**
 * 
 */
WordSchema.statics.addWord = async function (newWord) {
	try {
		const result = await this.updateOne({ word: newWord.word },
			{ $set: newWord },
			{ upsert: true }
			);
			// console.log(result);
		return result;
		// await newWord.save();
	} catch (e) {
		throw e;
	}
}


// WordSchema.statics.
module.exports = mongoose.model('Word', WordSchema)
