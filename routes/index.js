// ROUTES / index.js

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'node.js+Express Quiz',errors:[]});
});

//Autoload de comandos que incluyan :quizId
router.param("quizId", quizController.load); 

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión


// definici�n de rutas

router.get('/quizes', 				quizController.index);
// no tengo tiempo para investigar como separar en routing si tiene o no query:   router.get('/quizes.*search.*',	quizController.indexfiltered);
router.get('/quizes/:quizId(\\d+)',		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', 			 sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              	 sessionController.loginRequired, quizController.create);

router.get('/quizes/:quizId(\\d+)/edit', 	 sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 	 	 sessionController.loginRequired, quizController.update);

router.delete('/quizes/:quizId(\\d+)', 	 sessionController.loginRequired, quizController.destroy);


router.get ('/quizes/:quizId(\\d+)/comments/new', 	 commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 	 	 commentController.create);


router.get('/author', quizController.author);

module.exports = router;
