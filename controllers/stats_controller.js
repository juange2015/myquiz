var models = require('../models/models.js');

// GET /quizes/statistics
exports.showStats = function(req, res) {
	
	var statistics={  preguntas: 0,
				comentarios: 0,
				media_comentarios: 0,
				sin_comentarios: 0,
				con_comentarios: 0,
				
		};

	console.log("DEPURA Estadisticas");
	// hay que calcular:
	// El número de preguntas
	// El número de comentarios totales
	//models.Comment.count( { group : '"QuizId"'}).then(function (comments) {
	//	console.log("STATSComment.count", comments);
	//});
	// El número medio de comentarios por pregunta
	// El número de preguntas sin comentarios
	// El número de preguntas con comentarios

	models.sequelize.query('SELECT count(*) AS n FROM "Quizzes"').then(function(cuenta) {
		statistics.preguntas=cuenta[0].n;
		models.sequelize.query('SELECT count(*) AS n FROM "Comments"').then(function(cuenta) {
			statistics.comentarios=isNaN(cuenta[0].n)?0:+cuenta[0].n;  // por si el cero da problemas
			//console.log("Query1 DA", cuenta[0].n);
			if((+statistics.preguntas)>0) statistics.media_comentarios=(statistics.comentarios/statistics.preguntas).toFixed(2);
			models.sequelize.query('SELECT count(*) AS n FROM "Quizzes" WHERE "id" IN (SELECT DISTINCT "QuizId" FROM "Comments")').then(function(cuenta) {
				//statistics.con_comentarios=/^([0-9])*/.test(cuenta[0].n)?cuenta[0].n:0;
				statistics.con_comentarios=isNaN(cuenta[0].n)?0:+cuenta[0].n;
				//console.log("Query2 DA", cuenta[0].n);
				//+statistics.con_comentarios>0?statistics.con_comentarios:0;
				statistics.sin_comentarios=+statistics.preguntas-statistics.con_comentarios;
				res.render('quizes/statistics.ejs', {statistics: statistics, errors: []});
			});
		});
      });

	
	// habra que crear un controller que mappe las bases de datos para sacar los contajes
	// recupera de cuando contabas cuantos había para crear la máxima + 1 antes del comentario para borrar el id

	console.log("DEPURA Estadisticas OK");
	//JNG models.Quiz.count().then(function(count){
	//JNG 	console.log("STATScount", count);
	//JNG 	return models.Coment.count();
	//}).then(function(count){
	//	console.log("STATS2", count);
	//	return models.Quiz.findAll({ include: [{model: models.Comment }]})
	//}).then(function(count){
	//	console.log("STATSquizes", quizes);
	//		res.render('quizes/statistics',{quizes: quizes,errors: []}); 
	//	return sequelize.query(...);
		
	//JNG  });//.catch(function(error){next(error)});
						

};
