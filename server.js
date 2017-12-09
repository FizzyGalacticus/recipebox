let express = require('express');
let app = express();
const http = require('http');
const https = require('https');
let fs = require('fs');
const config = require('./config.json');

app.use(express.static(config.serveDirectory));

let certs = {
	key: fs.readFileSync(config.certs.key),
	cert: fs.readFileSync(config.certs.cert),
};

let httpsWebserver = https.createServer(certs, app);

let redirectServer = http.createServer((req, res) => {
	res.writeHead(302, {Location: `https://${req.headers.host}:${config.sslPort + req.url}`});
	res.end();

	try {
		let requesterIp = req.connection.remoteAddress.split(':');
		requesterIp = requesterIp[requesterIp.length - 1];
		console.log(`Request for insecure page from: ${requesterIp}`);
	}
	catch(err) {
		console.log(`Error when attempting to read IP: ${err}`);
	}
});

httpsWebserver.listen(config.sslPort, () => {
	console.log(`Securely listening on localhost:${config.sslPort}`);
});

redirectServer.listen(config.redirectPort, () => {
	console.log(`Listening on localhost:${config.redirectPort}`);
});
