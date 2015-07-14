var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
//jng var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//jng var DB_name  = (url[6]||null);
//jng var user     = (url[2]||null);
//jng var pwd      = (url[3]||null);
//jng var protocol = (url[1]||null);
//jng var dialect  = (url[1]||null);
//jng var port     = (url[5]||null);
//jng var host     = (url[4]||null);
//jng var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize('myquids',null,null,
	//{dialect: "sqlite", storage: "quiz.sqlite"}
	{dialect: 'sqlite', storage: ':memory:'}

	);

//jng var sequelize = new Sequelize(DB_name, user, pwd, 
//jng   { dialect:  protocol,
//jng     protocol: protocol,
//jng     port:     port,
//jng     host:     host,
//jng     storage:  storage,  // solo SQLite (.env)
//jng     omitNull: true      // solo Postgres
//jng   }      
//jng );

// Importar definicion de la tabla Quiz
//var quiz_path = path.join(__dirname,'quiz');
//var Quiz = sequelize.import(quiz_path);
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar definicion de la tabla Comment
//jng var comment_path = path.join(__dirname,'comment');
//jng var Comment = sequelize.import(comment_path);

// Importar definicion de la tabla Comment
//jng var user_path = path.join(__dirname,'user');
//jng var User = sequelize.import(user_path);

//jng Comment.belongsTo(Quiz);
//jng Quiz.hasMany(Comment);

// los quizes pertenecen a un usuario registrado
//jng Quiz.belongsTo(User);
//jng User.hasMany(Quiz);

// exportar tablas
exports.Quiz = Quiz; 
//jng exports.Comment = Comment; 
//jng exports.User = User;

console.log(sequelize.sync());
console.log("NO PITA");

if (sequelize.sync()===undefined) {console.log("te pille");};

sequelize.sync().success(function() {
	Quiz.count().success(function(count) {
		if (count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			})
			.success(function(){console.log('Database inicializada')});
			};
		});
	});		
//jng // sequelize.sync() inicializa tabla de preguntas en DB
//jng sequelize.sync().then(function() {
//jng   // then(..) ejecuta el manejador una vez creada la tabla
//jng   User.count().then(function (count){
//jng     if(count === 0) {   // la tabla se inicializa solo si está vacía
//jng       User.bulkCreate( 
//jng         [ {username: 'admin',   password: '1234', isAdmin: true},
//jng           {username: 'pepe',   password: '5678'} // el valor por defecto de isAdmin es 'false'
//jng         ]
//jng       ).then(function(){
//jng         console.log('Base de datos (tabla user) inicializada');
//jng         Quiz.count().then(function (count){
//jng           if(count === 0) {   // la tabla se inicializa solo si está vacía
//jng             Quiz.bulkCreate( 
//jng               [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', UserId: 2}, // estos quizes pertenecen al usuario pepe (2)
//jng                 {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', UserId: 2}
//jng               ]
//jng             ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
//jng           };
//jng         });
//jng       });
//jng     };
//jng   });
//jng });