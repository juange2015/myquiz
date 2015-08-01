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
//intenté separar los casos en el router: exports.indexfiltered = function(req, res) {
exports.index = function(req, res){
	console.log("DEPURA FILTRA", req.query.search);
	console.log("DEPURA FILTRA", req.query.tema);
	
	// me falta poder filtrar por ambas cosas a la vez: hay que ver cómo se meten ambas condiciones en el where
	
	if (req.query.tema){
		console.log("DEPURA con tema", req.query.tema);
		//var texto= req.query.search;
		//depura console.log("DEPURA2", texto);
		console.log("DEPURA5->:", texto,":<-");
		models.Quiz.findAll({where:["tema like ?", req.query.tema],order:'pregunta ASC'}).then(function(quizes){
			res.render('quizes/index',{quizes: quizes,errors: []}); 
			}).catch(function(error) { next(error);});
		
	}else if (req.query.search && req.query.search !=''){
	console.log("DEPURA con search", req.query,req.query.search);
		//var texto= req.query.search;
		//depura console.log("DEPURA2", texto);
		var texto=req.query.search.replace(" ", "%");
		console.log("DEPURA5->:", texto,":<-");
		models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%'],order:'pregunta ASC'}).then(function(quizes){
			res.render('quizes/index',{quizes: quizes,errors: []}); 
			}).catch(function(error) { next(error);});
		
	}else{
		console.log("DEPURA sin parametros", req.query,req.query.search);
		//depura console.log("DEPURASIN", req.query);
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes,errors:[]}); 
		}).catch(function(error) { next(error);});
	}
		
};

// GET /quizes/:id
exports.show = function(req, res) {
	//console.log("DEPURAshow", req);
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		//depurando if (quiz===null ) console.log("quiz ya es nulo",req.params);
		//depurando console.log("Depurando: ", quiz);
		res.render('quizes/show', { quiz: req.quiz,errors:[]});
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
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado,errors:[]});
		//}
	//})
};

// GET /quizes/question
exports.author = function(req, res) {
  res.render('author',{autor: 'juange',errors:[]});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz (hay que ponerle ahora la categoria)
    {pregunta: "Pregunta que propones", respuesta: "La respuesta correcta sería..."}
  );
  res.render('quizes/new', {quiz: quiz,errors:[]});
};

// POST /quizes/create
exports.create = function(req, res) {
	
	//depura console.log("DEPURANDO CREATE", req.body.quiz);
	var quiz = models.Quiz.build( req.body.quiz );
       	var fallos=quiz.validate();
	
	 // save: guarda en base de datos los campos pregunta y respuesta de quiz
	//depura console.log("DEPURANDO Quiz", fallos);
	//console.log("DEPURANDO QuizValidate", quiz.validate());
        //quiz.validate().then(function(err){
	//	console.log("DEPURANDO RESUELTO");
	
	// el codigo propuesto da falllos porque quiz.validate() devolvia null
		if (fallos) {
			var i=0;
			misfallos=new Array();
			for (var prop in fallos){
				misfallos[i++]={message: fallos[prop]};
			}
			res.render("quizes/new", {quiz:quiz, errors: misfallos});
		}
		else{
			quiz.save({fields: ["pregunta", "respuesta","tema"]})
			.then( function(){res.redirect('/quizes')})
            // res.redirect: RedirecciÃ³n HTTP a lista de preguntas
		}
	};
	
// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};




// PUT /quizes/:id
exports.update = function(req, res) {
//req.quiz ya es el objeto que tienes mapeado en sequalize: actualiza sobre él y haz save al final
	
console.log("DEPURA UPDATE req.quiz.pregunta", req.quiz.pregunta,req.quiz.tema);   
console.log("DEPURA UPDATE body.tema", req.body.tema);   
//copias a capón los valores nuevos en los viejos, y ya haras save en la base de datos
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.tema;  // no se por qué sale fuera de quiz
console.log("DEPURA UPDATE quiz.pregunta.cambiada", req.quiz.pregunta,req.quiz.tema);   
	
	
 var fallos=req.quiz.validate();

   if (fallos) {
	      var i=0;
 			misfallos=new Array();
 			for (var prop in fallos){
 				misfallos[i++]={message: fallos[prop]};
 			}
 			res.render("quizes/edit", {quiz:req.quiz, errors: misfallos});
// 			//res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
	//quiz.update({fields: ["pregunta", "respuesta"],validate: true, where:["pregunta like ?", viejapregunta],order:'pregunta ASC' })
        req.quiz.save({fields: ["pregunta", "respuesta","tema"]}).then( function(){ res.redirect('/quizes');});

        
	// quiz.save( {fields: ["pregunta", "respuesta"]}).then( function(){ res.redirect('/quizes');});
	 
      };
};


// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
