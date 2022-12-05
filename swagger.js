const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js', './src/routers/talkerRouter.js'];

swaggerAutogen(outputFile, endpointsFiles);