module.exports = function(app) {
    var todoList = require('../controllers/LyricDataController');


    // todoList Routes
    app.route('/search')
      .get(todoList.searchRhyme)

    app.route('/word')
        .get(todoList.searchRhyme)
        .post(todoList.addWord);


    app.route('/word/:lyricId')
        .get(todoList.read_a_lyric)
        .put(todoList.update_a_lyric)
        .delete(todoList.delete_a_lyric);
};
