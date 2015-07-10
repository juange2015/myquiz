//var models = require('../models/models.js');



// GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question',{pregunta: '¿cual es la capital de Italia?'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	if (req.query.respuesta ==="Roma"){
		res.render('quizes/answer',{respuesta: 'OK, correcto'});
	} else {
		res.render('quizes/answer',{respuesta: 'NO, incorrecto'});
	}
};

