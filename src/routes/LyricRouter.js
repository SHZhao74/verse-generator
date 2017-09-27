module.exports = function(app) {
    var todoList = require('../controllers/LyricDataController');


    // todoList Routes
    app.route('/word')
        .get(todoList.list_all_lyrics)
        .post(todoList.create_a_lyric);


    app.route('/word/:lyricId')
        .get(todoList.read_a_lyric)
        .put(todoList.update_a_lyric)
        .delete(todoList.delete_a_lyric);
};
