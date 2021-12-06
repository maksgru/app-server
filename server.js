const socket = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = require('./app');
const config = require('./config');
const { swaggerOptions } = require('./utils/swagger');
const sockets = require('./sockets');
const { IO } = require('./utils/constants');
require('colors');

const { port } = config.common;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const server = app.listen(port, err => {
  if (err) {
    return console.log(err, 'something goes wrong');
  }
  const infoString = ['\n', '*** Server is listening on port: '.bgWhite.blue, port.bgWhite.bold.red, '\n'].join('');
  console.log(infoString);
});

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
    credentials: true
  }
});
sockets(io, app);
app.set(IO, io);
