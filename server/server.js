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
// let server = http.createServer(app);

const PORT = process.env.PORT ? process.env.PORT : config.sslPort;
server.listen(PORT, () => {
	console.log(`Securely listening on localhost:${PORT}`);
});

// server.listen(config.sslPort, () => {
// 	console.log(`Listening on localhost:${config.sslPort}`);
// });

process.on('SIGINT', function() {
    server.close();
    process.exit();
});
