const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

require('dotenv').config({ path: __dirname + '/.env' });
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Validtor Middleware
// app.use(expressValidator({
//   errorFormatter: function (param, msg, value) {
//     var namespace = param.split('.')
//     var formParam = namespace.shift()

//     while (namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     };
//   }
// }));

// swagger configuration
const swaggerDefinition = {
  info: {
    title: 'GIS Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the routes',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let authApi = require('./routes/auth');
let adminRoute = require('./routes/admin');
let basicRoute = require('./routes/basic');

app.use('/api/', authApi, adminRoute, basicRoute);

// set port
const port = process.env.PORT || 3000;

// start server
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});