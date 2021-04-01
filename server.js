const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = require('./app');
const config = require('./config');
const { swaggerOptions } = require('./utils/swagger');

const { port } = config.common;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, err => {
  if (err) {
    return console.log(err, 'something goes wrong');
  }
  console.log('server is listening on port: ', port);
});
