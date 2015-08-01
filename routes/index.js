// ROUTES / index.js

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
// no tengo tiempo para investigar como separar en routing si tiene o no query:   router.get('/quizes.*search.*',	quizController.indexfiltered);
router.get('/quizes/:quizId(\\d+)',		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', 			 quizController.new);
router.post('/quizes/create',              	 quizController.create);


router.get('/author', quizController.author);

module.exports = router;
