var http = require('http');
var fs = require ('fs');
var path = require('path');

http.createServer(function(req, res){
	if(req.url ==="/"){
		fs.readFile("home.html", function(err,html){
			res.writeHead(200, {'Content-Type': "text/html"});
			res.end(html);
		})
	}
	else if(req.url.match("\.css$")){
		var cssPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");
		res.writeHead(200,{'Content-Type':'text/css'});
		fileStream.pipe(res);
	}
	else if (req.url.match("\.js$")){
		var jsPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(jsPath, "UTF-8");
		res.writeHead(200,{'Content-Type':'text/javascript'});
		fileStream.pipe(res);
	}
	else{
		res.writeHead(404,{"Content-Type":"text/html"});
		res.end("No Page Found");
	}
}).listen(8080);
