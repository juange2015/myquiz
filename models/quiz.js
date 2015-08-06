// Incluye validación de lo que ha introducido el usuario

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(  
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta clasificar el tema"}}
      }//,
	// si no creas este campo, el id lo gestiona automáticamente serialize
	//id:{  
	//      type: DataTypes.STRING,
	//}
      }
      );
}