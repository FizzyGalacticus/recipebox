const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const SocketHandler = require('./sockets/SocketHandler.js');
const config = require(`${__dirname}/config.json`);
const path = require('path');
const log = require('fancy-log');

class RecipeServer {
	constructor(options = {}) {
		let serveDirectory;

		if(options.useSSL !== undefined)
			this.useSSL = options.useSSL;
		else
			this.useSSL = `${__dirname}/${config.useSSL}`;

		if(options.serveDirectory !== undefined)
			serveDirectory = options.serveDirectory;
		else
			serveDirectory = `${__dirname}/${config.serveDirectory}`;

		if(options.certs !== undefined)
			this.certs = options.certs;
		else {
			this.certs = {
				key: fs.readFileSync(process.env.KEY ? process.env.KEY : config.certs.key),
				cert: fs.readFileSync(process.env.CERT ? process.env.CERT : config.certs.cert),
			};
		}

		if(options.port !== undefined)
			this.port = options.port;
		else
			this.port = process.env.PORT ? process.env.PORT : config.sslPort;

		app.use(express.static(serveDirectory));
		app.get('/*', (req, res) => {
			res.sendFile(path.resolve(`${serveDirectory}/index.html`));
		});

		if(this.useSSL)
			this.server = https.createServer(this.certs, app);
		else
			this.server = http.createServer(app);
		this.socketHandler = new SocketHandler(this.server);
	}

	start(fn = () => {}) {
		this.server.listen(this.port, () => {
			const url = this.getLocalhostUrl();
			log(`Securely listening at ${url}`);
			fn(url);
		});
	}

	stop() {
		this.server.close();
		log('Server successfully stopped.');
	}

	getLocalhostUrl() {
		if(this.useSSL)
			return `https://localhost:${this.port}`;
		else
			return `http://localhost:${this.port}`;
	}
}

module.exports = exports = RecipeServer;
