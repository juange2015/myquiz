var models = require('../models/models.js');

// Autoload factoriza el codigo común para rutas que contengan :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
	function(quiz){
		if (quiz){
			req.quiz=quiz;
			next();
		}else {
			next(new Error("No existe el quidId="+ quizId));
		}
	}
	).catch(function(error){next(error);});
};




// GET /quizeshttp://localhost:5000/quizes/?search=algo
exports.index = function(req, res) {
	console.log("DEPURA", req.query,req.query.search);
	if (req.query.search){
		var texto= req.query.search;
		//depura console.log("DEPURA2", texto);
		texto=texto.replace(" ", "%");
		//depura console.log("DEPURA5", texto);
		models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%']/*,order:'pregunta ASC'*/}).then(function(quizes){
			res.render('quizes/index',{quizes: quizes}); 
			}).catch(function(error) { next(error);});
		
	}
	else{
		//depura console.log("DEPURASIN", req.query);
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes}); 
		})//.catch(function(error) { next(error);};
	}
		
};

// GET /quizes/:id
exports.show = function(req, res) {
	//console.log("DEPURAshow", req);
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		//depurando if (quiz===null ) console.log("quiz ya es nulo",req.params);
		//depurando console.log("Depurando: ", quiz);
		res.render('quizes/show', { quiz: req.quiz});
	//})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	//models.Quiz.find(req.params.quizId).then(function(quiz){
	var resultado="Incorrecto";
		if (req.query.respuesta === req.quiz.respuesta){
			//res.render('quizes/answer', 
			//{quiz: quiz, respuesta: "Correcto"});
			resultado="Correcto";
		} //else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
		//}
	//})
};

// GET /quizes/question
exports.author = function(req, res) {
  res.render('author',{autor: 'juange'});
};