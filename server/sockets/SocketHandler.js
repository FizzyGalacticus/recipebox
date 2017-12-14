let io = require('socket.io');
let database = require('../database/Database.js').getInstance();

class SocketHandler {
	constructor(server) {
		this.server = server;
		this.socketio = io(this.server);
		this.database = database;

		this.initSignals();
	}

	initSignals() {
		this.socketio.sockets.on('connection', (socket) => {
			console.log(`Client connected.`);

			socket.on('getRecipe', async (opts) => {
				try {
					let recipes = await this.database.getRecipe(opts);
					socket.emit('getRecipe', {success: true, recipes});
				}
				catch(err) {
					socket.emit('getRecipe', {success: false, message: err});
				}
			});

			socket.on('saveRecipe', async (data) => {
				try {
					let response = await this.database.saveRecipe(data);
					socket.emit('saveRecipe', {success: true, response});
				}
				catch(err) {
					socket.emit('saveRecipe', {success: false, message: err});
				}
			});

			socket.on('getIngredient', async (opts) => {
				try {
					let ingredients = await this.database.getIngredient(opts);
					socket.emit('getIngredient', {success: true, ingredients});
				}
				catch(err) {
					socket.emit('getIngredient', {success: false, message: err});
				}
			});

			socket.on('saveIngredient', async (data) => {
				try {
					let response = await this.database.saveIngredient(data);
					socket.emit('saveIngredient', {success: true, response});
				}
				catch(err) {
					socket.emit('saveIngredient', {success: false, message: err});
				}
			});

			socket.on('getInstruction', async (opts) => {
				try {
					let instructions = await this.database.getInstruction(opts);
					socket.emit('getInstruction', {success: true, instructions});
				}
				catch(err) {
					socket.emit('getInstruction', {success: false, message: err});
				}
			});

			socket.on('saveInstruction', async (data) => {
				try {
					let response = await this.database.saveInstruction(data);
					socket.emit('saveInstruction', {success: true, response});
				}
				catch(err) {
					socket.emit('saveInstruction', {success: false, message: err});
				}
			});

			socket.on('getMeasurement', async (opts) => {
				try {
					let measurements = await this.database.getMeasurement(opts);
					socket.emit('getMeasurement', {success: true, measurements});
				}
				catch(err) {
					socket.emit('getMeasurement', {success: false, message: err});
				}
			});

			socket.on('saveMeasurement', async (data) => {
				try {
					let response = await this.database.saveMeasurement(data);
					socket.emit('saveMeasurement', {success: true, response});
				}
				catch(err) {
					socket.emit('saveMeasurement', {success: false, message: err});
				}
			});

			socket.on('getUser', async (opts) => {
				try {
					let users = await this.database.getUser(opts);
					socket.emit('getUser', {success: true, users});
				}
				catch(err) {
					socket.emit('getUser', {success: false, message: err});
				}
			});

			socket.on('saveUser', async (data) => {
				try {
					let response = await this.database.saveUser(data);
					socket.emit('saveUser', {success: true, response});
				}
				catch(err) {
					socket.emit('saveUser', {success: false, message: err});
				}
			});

			socket.on('disconnect', () => {
				console.log(`Client disconnected.`);
			});
		});
	}
}

module.exports = SocketHandler;
