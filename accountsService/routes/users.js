
var controller = require('../controllers/userController');

var userPlugin = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/users',
            handler: function(request, reply){
                reply(controller.saveUser(request.payload));
            }
        });

        server.route({
            method: 'GET',
            path: '/users',
            handler: function(request, reply){
                controller.getUsers()
                    .then(function(users){
                        reply(users);
                    })
            }
        });

        next();
    }
};

userPlugin.register.attributes = {
    name: 'userPlugin',
    version: '1.0.0'
};

module.exports = userPlugin;
