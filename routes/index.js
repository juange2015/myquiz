var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Autoload de comandos que incluyan :quizId
router.param("quizId", quizController.load);

router.get('/quizes', 				quizController.index);
//router.get('/quizes?search=:filtro(\\w+)]',	quizController.indexfiltered);
router.get('/quizes/:quizId(\\d+)',		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', quizController.author);

module.exports = router;
