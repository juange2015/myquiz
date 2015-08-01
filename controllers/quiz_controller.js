//CONTROLLERS  / quiz_controller.js

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




// GET /quizes/?search=algo
//exports.indexfiltered = function(req, res) {
exports.index = function(req, res){
	
	
	if (req.query.search){
	console.log("DEPURA con search", req.query,req.query.search);
		//var texto= req.query.search;
		//depura console.log("DEPURA2", texto);
		var texto=req.query.search.replace(" ", "%");
		console.log("DEPURA5->:", texto,":<-");
		models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%'],order:'pregunta ASC'}).then(function(quizes){
			res.render('quizes/index',{quizes: quizes}); 
			}).catch(function(error) { next(error);});
		
	}else{
		console.log("DEPURA sin parametros", req.query,req.query.search);
		//depura console.log("DEPURASIN", req.query);
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes}); 
		}).catch(function(error) { next(error);});
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

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz (hay que ponerle ahora la categoria)
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
        // save: guarda en base de datos los campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta"]}).then( function(){ 
		res.redirect('/quizes');}
            // res.redirect: RedirecciÃ³n HTTP a lista de preguntas
  ).catch(function(error){next(error)});
};

