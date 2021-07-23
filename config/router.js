const bodyParser = require('body-parser');

const auth = require('../api/controllers/authentication');
const user = require('../api/controllers/user');

const { jwtAuthenticate } = require('../api/middlewares/authentication');

const API_VERSION = process.env.API_VERSION;

const bodyParserJson = bodyParser.json({
  limit: '5mb',
});
const bodyParserUrl = bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
  parameterLimit: 50000,
});

const routes = [auth];
const generateRoutes = app =>
  app.use(`/${API_VERSION}`, bodyParserUrl, bodyParserJson, routes);

const jwtRoutes = [user];
const generateJwtRoutes = app =>
  app.use(`/${API_VERSION}`, bodyParserUrl, bodyParserJson, jwtAuthenticate, jwtRoutes);

exports.generateAPIRoutes = (app) => {
  generateRoutes(app);
  generateJwtRoutes(app);
};
