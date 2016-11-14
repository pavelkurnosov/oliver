'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8001
});

var Good = require('good');
var goodConfig = require('./config/good');

var apiPrefix = '/api';

var register = function(plugin){
    return server.register({register: require(plugin)}, {
        routes: {
            prefix: apiPrefix
        }
    })
};

server.register({
        register: Good,
        options: goodConfig
        });

register('./routes/staticData')
    .then(function(){
        return register('./routes/users');
    })
    .then(onStartServer);

function onStartServer(err){
    if(err){
        console.error('An error occurred');
        throw err;
    } else {
        // Add the route
        server.route({
            method: 'GET',
            path:'/hello',
            handler: function (request, reply) {

                return reply('hello world');
            }
        });

        // Start the server
        server.start()
            .then(function(err) {

                if (err) {
                    throw err;
                }
                console.log('Server running at:', server.info.uri);
            });
    }
}

