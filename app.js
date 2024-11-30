const connectToMongo = require('./Global/Handler/MongoHandler.js');
const client = require('./Global/Handler/ClientHandler.js');
const settings = require('./Global/Config/Settings.js');
client.login(settings.token);
connectToMongo();