const RecipeServer = require('./RecipeServer');

const server = new RecipeServer();

server.start();

process.on('SIGINT', () => {
	server.stop();
	process.exit();
});
