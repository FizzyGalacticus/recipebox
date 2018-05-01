const io = require('socket.io');
const database = require('../database/Database.js').getInstance();
const log = require('fancy-log');

class SocketHandler {
	constructor(server) {
		this.server = server;
		this.socketio = io(this.server);
		this.database = database;

		this.initSignals();
	}

	initSignals() {
		this.socketio.sockets.on('connection', (socket) => {
			log(`Client connected.`);

			socket.on('getRecipe', async (opts, ack = () => {}) => {
				try {
					const recipes = await this.database.getRecipe(opts);
					ack({success: true, recipes});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('saveRecipe', async (data, ack) => {
				try {
					const response = await this.database.saveRecipe(data);
					ack({success: true, response});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('getIngredient', async (opts, ack = () => {}) => {
				try {
					const ingredients = await this.database.getIngredient(opts);
					ack({success: true, ingredients});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('saveIngredient', async (data, ack) => {
				try {
					const response = await this.database.saveIngredient(data);
					ack({success: true, response});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('getInstruction', async (opts, ack = () => {}) => {
				try {
					const instructions = await this.database.getInstruction(opts);
					ack({success: true, instructions});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('saveInstruction', async (data, ack) => {
				try {
					const response = await this.database.saveInstruction(data);
					ack({success: true, response});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('getMeasurement', async (opts, ack = () => {}) => {
				try {
					const measurements = await this.database.getMeasurement(opts);
					ack({success: true, measurements});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('saveMeasurement', async (data, ack) => {
				try {
					const response = await this.database.saveMeasurement(data);
					ack({success: true, response});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('getUser', async (opts, ack = () => {}) => {
				try {
					const users = await this.database.getUser(opts);
					ack({success: true, users});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('saveUser', async (data, ack) => {
				try {
					const response = await this.database.saveUser(data);
					ack({success: true, response});
				}
				catch(err) {
					ack({success: false, message: err});
				}
			});

			socket.on('disconnect', () => {
				log(`Client disconnected.`);
			});
		});
	}
}

module.exports = SocketHandler;
