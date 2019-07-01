const mongoose = require('mongoose');
const logger = require('./logger');
const { MONGO_URI: DB_URI } = require('./environment');

const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

exports.loadDB = () => {
  mongoose.set('runValidators', true);
  mongoose.connect(DB_URI, DB_OPTIONS);
  mongoose.connection
    .once('open', () => logger.info('Connected to data base successfully'))
    .on('error', (error) => {
      logger.error(`Connection data base error: ${error}`);
      mongoose.connection.close();
    })
    .on('disconnected', () => logger.error('Lost MongoDB connection...'))
    .on('reconnected', () => logger.info('Reconnected to MongoDB'));
};
