var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes}); 
	})
};

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		//depurando if (quiz===null ) console.log("quiz ya es nulo",req.params);
		//depurando console.log("Depurando: ", quiz);
		res.render('quizes/show', { quiz: quiz});
	})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
			{quiz: quiz, respuesta: "Correcto"});
		} else {
			res.render('quizes/answer', 
			{quiz: quiz, respuesta: 'NO, '+req.query.respuesta+' es incorrecto. Es '+quiz.respuesta});
		}
	})
};

// GET /quizes/question
exports.author = function(req, res) {
  res.render('author',{autor: 'juange'});
};