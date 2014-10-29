var cors = require('cors')
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var getNames = function(link, res){
	request(link, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var email = '';
			var author = $('.auths').find('a').first().text();
			var authorInfo = $('.ui-ncbi-toggler-slave').find('li').first().text().split(' ');
			authorInfo.map(function(value, index){
				if (value.indexOf('@') > -1) {
					email = value;
				};
			});
			res.send({author: author, email: email});
		}else{
			res.send({author: '', email: ''})
		}
	});
};

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/pubmed', function(req, res) {
	var link = req.query.link;
	getNames(link, res);
});

var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});