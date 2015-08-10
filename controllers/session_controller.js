// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
	console.log("PIDE ALGO",req.session);
     if (req.session.user) {
         next();
     } else {
         res.redirect('/login');
     }
 };

// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Parece que no vamos bien: '+error}];
            res.redirect("/login");        
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};

// para que te eche a los 2 minutos
req.session.cookie._expires=30;
req.session.cookie.secure=true;
req.session.cookie.maxAge=30000; // 30 segundos �nicamente

	console.log ("QUE TIENE UNA SESION", req.session);
        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};