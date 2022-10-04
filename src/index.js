const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const randomtoken = require('./utils/token');
const autentication = require('./utils/autentication');

const pathTalker = path.resolve(__dirname, 'talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  res.status(HTTP_OK_STATUS).json([...talkers]);
});

app.get('/talker/:id', async (req, res) => {
  // const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  const id = Number(req.params.id);
  const talker = talkers.find((t) => t.id === id);
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', autentication, (req, res) => {
  const { email, password } = req.body;
  // if (email === 'email@email.com' && password === '123456') {
    res.status(HTTP_OK_STATUS).json({ token: randomtoken() });
  // }
  // res.status(501).json({ message: 'not' });

});

app.listen(PORT, () => {
  console.log('Online');
});
