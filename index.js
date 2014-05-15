var request = require('request');
var _       = require('underscore');
var express = require('express');
var app     = express();
var output = '';

app.get('/', function(req, res){
    request('http://planejasampa.prefeitura.sp.gov.br/metas/api/goals', function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            var apiResult = JSON.parse(body);
            var list = "<% _.each(api, function(meta) { %> <li>Meta <%= meta.id %> - <%= meta.name %></li> <% }); %>";
            output = _.template(list, {api: apiResult});
        }
    });
    res.send('<ul>'+output+'</ul>');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});