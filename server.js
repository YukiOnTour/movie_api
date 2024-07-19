const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;

    if (path === '/documentation') {
        fs.readFile('documentation.html', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    }

    const logEntry = `${new Date().toISOString()} - ${request.url}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log.txt');
        }
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
