let express = require('express');
let app = express();
const https = require('https');
let fs = require('fs');
let SocketHandler = require('./sockets/SocketHandler.js');
const config = require(`${__dirname}/config.json`);

app.use(express.static(`${__dirname}/${config.serveDirectory}`));

let certs = {
	key: fs.readFileSync(process.env.KEY ? process.env.KEY : config.certs.key),
	cert: fs.readFileSync(process.env.CERT ? process.env.CERT : config.certs.cert),
};

let server = https.createServer(certs, app);
let socketHandler = new SocketHandler(server);

const PORT = process.env.PORT ? process.env.PORT : config.sslPort;
server.listen(PORT, () => {
	console.log(`Securely listening on localhost:${PORT}`);
});

process.on('SIGINT', function() {
	server.close();
	process.exit();
});