let express = require('express');
let app = express();
const http = require('http');
const https = require('https');
let fs = require('fs');
const config = require(`${__dirname}/config.json`);

app.use(express.static(`${__dirname}/${config.serveDirectory}`));

let certs = {
	key: fs.readFileSync(config.certs.key),
	cert: fs.readFileSync(config.certs.cert),
};

let server = https.createServer(certs, app);

server.listen(config.sslPort, () => {
	console.log(`Securely listening on localhost:${config.sslPort}`);
});

process.on('SIGINT', function() {
    server.close();
    process.exit();
});
