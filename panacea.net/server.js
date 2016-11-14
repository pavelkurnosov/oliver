var express = require('express');

var app = express();
var request = require('request');
app.use(express.static('public'));

var apiServerHost = 'http://localhost:8001/api';

var handleError = function(err, res, body){
    if(err) {
        console.log('There was an error processing the request, details to follow ...');
        console.log(err);
    }
};

app.use('/api', function (req, res) {
    try{
        var url = apiServerHost + req.url;
        req.pipe(request(url, handleError)).pipe(res);
    } catch(err){
        console.log('Caught error trying to pipe request to external API: ' + err.toString());
    }
});


app.use('/api', function (req, res) {
    try{
        var url = apiServerHost + req.url;
        req.pipe(request(url, handleError)).pipe(res);
    } catch(err){
        console.log('Caught error trying to pipe request to external API: ' + err.toString());
    }
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port)

});