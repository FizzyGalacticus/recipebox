let mongoose = require('mongoose');
let fs = require('fs');
let grid = require('gridfs-stream');

/* MODELS */
let RecipeModel = require('./models/recipemodel.js');
let MeasurementModel = require('./models/measurementmodel.js');
let InstructionModel = require('./models/instructionmodel.js');
let IngredientModel = require('./models/ingredientmodel.js');
let UserModel = require('./models/usermodel.js');

mongoose.Promise = Promise;
grid.mongo = mongoose.mongo;

class Database {
	constructor() {
		mongoose.connect('mongodb://localhost/recipebox', {
			useMongoClient: true,
		});

		this.connection = mongoose.connection;

		this.connection.on('error', (err) => {
			this.connected = false;
		});

		this.connection.once('open', () => {
			this.connected = true;
			this.gfs = grid(this.connection.db);
		});
	}

	saveFile(file, metadata) {
		return new Promise((resolve, reject) => {
			let filename = file.filename;
			let location = file.location;
			let root = file.root;

			let writeStream = this.gfs.createWriteStream({
				filename,
				metadata,
				root,
			});

			writeStream.on('close', (fileResults) => {
				resolve(fileResults);
			});

			writeStream.on('error', (err) => {
				reject(`Issue saving file to database: ${err}`);
			});

			fs.createReadStream(location).pipe(writeStream);
		});
	}

	getFile(file) {
		return new Promise((resolve, reject) => {
			this.gfs.exist(file, (err, found) => {
				if(err)
					reject(`Could not search for file in database: ${err}`);
				else if(!found)
					reject(`File not found.`);
				else {
					let stream = this.gfs.createReadStream(file);

					resolve(stream);
				}
			});
		});
	}

	save(model, data) {
		return new Promise((resolve, reject) => {
			let saveFunc = (err, response) => {
				if(err)
					reject(`Cannot save model: ${err}`);
				else
					resolve(response);
			};

			if(Array.isArray(data))
				model.insertMany(data, saveFunc);
			else {
				let tempModel = new model(data);
				tempModel.save(saveFunc);
			}
		});
	}

	get(model, opts) {
		return new Promise((resolve, reject) => {
			model.find(opts).exec((err, results) => {
				if(err)
					reject(`Could not get model: ${err}`);
				else if(results === null)
					resolve([]);
				else
					resolve(results);
			});
		});
	}

	saveRecipe(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await this.save(RecipeModel, data);
				resolve(response);
			}
			catch(err) {
				reject(`Could not save recipe: ${err}`);
			}
		});
	}

	getRecipe(opts) {
		return new Promise(async (resolve, reject) => {
			try {
				let recipes = await this.get(RecipeModel, opts);
				resolve(recipes);
			}
			catch(err) {
				reject(`Could not retrieve recipes: ${err}`);
			}
		});
	}

	saveMeasurement(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await this.save(MeasurementModel, data);
				resolve(response);
			}
			catch(err) {
				reject(`Could not save measurement: ${err}`);
			}
		});
	}

	getMeasurement(opts) {
		return new Promise(async (resolve, reject) => {
			try {
				let measurements = await this.get(MeasurementModel, opts);
				resolve(measurements);
			}
			catch(err) {
				reject(`Could not retrieve measurements: ${err}`);
			}
		});
	}

	saveIngredient(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await this.save(IngredientModel, data);
				resolve(response);
			}
			catch(err) {
				reject(`Could not save ingredient: ${err}`);
			}
		});
	}

	getIngredient(opts) {
		return new Promise(async (resolve, reject) => {
			try {
				let ingredients = await this.get(IngredientModel, opts);
				resolve(ingredients);
			}
			catch(err) {
				reject(`Could not retrieve ingredients: ${err}`);
			}
		});
	}

	saveInstruction(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await this.save(InstructionModel, data);
				resolve(response);
			}
			catch(err) {
				reject(`Could not save instruction: ${err}`);
			}
		});
	}

	getInstruction(opts) {
		return new Promise(async (resolve, reject) => {
			try {
				let instructions = await this.get(InstructionModel, opts);
				resolve(instructions);
			}
			catch(err) {
				reject(`Could not retrieve instructions: ${err}`);
			}
		});
	}

	saveUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await this.save(UserModel, data);
				resolve(response);
			}
			catch(err) {
				reject(`Could not save user: ${err}`);
			}
		});
	}

	getUser(opts) {
		return new Promise(async (resolve, reject) => {
			try {
				let users = await this.get(UserModel, opts);
				resolve(users);
			}
			catch(err) {
				reject(`Could not retrieve users: ${err}`);
			}
		});
	}
}

class DatabaseHandler {
	static getInstance() {
		if(!DatabaseHandler.instance)
			DatabaseHandler.instance = new Database();

		return DatabaseHandler.instance;
	}
}

module.exports = DatabaseHandler;
