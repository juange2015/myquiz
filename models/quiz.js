// Incluye validaci�n de lo que ha introducido el usuario

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
      id:{  // no se si lo terminar� usando
	      type: DataTypes.STRING,
      }
      }
      );
}