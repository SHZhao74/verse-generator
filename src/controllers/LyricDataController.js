import mongoose from 'mongoose'
import querystring from 'querystring'
const Lyric = mongoose.model('Lyrics')

//針對不同request的回應(json格式)

exports.list_all_lyrics = function(req, res) {
    Lyric.find({}, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

//CRUD

exports.create_a_lyric = function(req, res) {
    var new_lyric = new Lyric(req.query);
		console.error(req.query)
    new_lyric.save(function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

exports.read_a_lyric = function(req, res) {
    Lyric.findById(req.params.lyricId, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

exports.update_a_lyric = function(req, res) {
    Lyric.findOneAndUpdate(req.params.lyricId, req.body, { new: true }, function(err, lyric) {
        if (err)
            res.send(err);
        res.json(lyric);
    });
};

exports.delete_a_lyric = function(req, res) {


    Lyric.remove({
        _id: req.params.lyricId
    }, function(err, lyric) {
        if (err)
            res.send(err);
        res.json({ message: 'Lyric successfully deleted' });
    });
};
