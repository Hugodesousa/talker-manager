const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const randomtoken = require('./utils/token');
const autentication = require('./middlewares/autentication');
const talkerRouter = require('./routers/talkerRouter');
const swaggerFile = require('../swagger_output.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', autentication, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: randomtoken() });
});

app.use(talkerRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log('Online');
});
