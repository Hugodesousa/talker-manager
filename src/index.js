const express = require('express');
const bodyParser = require('body-parser');
const randomtoken = require('./utils/token');
const autentication = require('./middlewares/autentication');
const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', autentication, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: randomtoken() });
});

app.use(talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
