const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
	let body = '';
	if(req.method === 'GET' && req.url === '/')
	{
		res.writeHead(200, {'Content-Type' : 'text/html'});
		fs.readFile('./index.html', 'UTF-8', (err, data) => {
			if(err) throw err;
			res.write(data);
			res.end();
		});
    }  
    if(req.method === 'POST')
    {   
        req.on('data', (data) => {
            body += data;
            fs.appendFile('message.txt', data, function (err) {
                if (err) throw err;
                console.log('Saved!');
                });
        });
        req.on('end', () => {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(body, () => {
                res.end();
            });
        });   
    }
}).listen(8080);
console.log('Server is Running');