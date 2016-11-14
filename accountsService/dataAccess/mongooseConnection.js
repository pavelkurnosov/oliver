var mongoose = require('mongoose');
var dbConfig = require('../config/dbConfig');

var url = 'mongodb://' + dbConfig.hostName + (dbConfig.port ? ':' + dbConfig.port : '') + '/accounts';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

module.exports = db;


//
// var db = mongoose.connection;
// db.on('connecting', function() {
//     console.log('connecting');
// });
//
// db.on('error', function(error) {
//     console.error('Error in MongoDb connection: ' + error);
//     mongoose.disconnect();
// });
// db.on('connected', function() {
//     console.log('connected!');
// });
// db.once('open', function() {
//     console.log('connection open');
// });
// db.on('reconnected', function () {
//     console.log('reconnected');
// });
// db.on('disconnected', function() {
//     console.log('disconnected');
//     console.log('dbURI is: '+dbURI);
//     mongoose.connect(dbURI, {server:{auto_reconnect:true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
// });
// console.log('dbURI is: '+dbURI);
// mongoose.connect(dbURI, {server:{auto_reconnect:true}});
