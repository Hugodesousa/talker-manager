const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { validName, 
  validAge, 
  validToken, 
  validTalker1, 
  validTalker2 } = require('../utils/validTalker');

const router = express.Router();

const pathTalker = path.resolve(__dirname, '..', 'talker.json');

const HTTP_OK_STATUS = 200;
const HTTP_CREAT_OK = 201;
const HTTP_NOT_FOUND = 404;

router.get('/talker', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  res.status(HTTP_OK_STATUS).json([...talkers]);
});

router.get('/talker/:id', async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  const id = Number(req.params.id);
  const talker = talkers.find((t) => t.id === id);
  if (!talker) {
    res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

router.post('/talker', 
validToken, 
validName, 
validAge, 
validTalker1, 
validTalker2, async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  const newTalker = req.body;
  newTalker.id = talkers[talkers.length - 1].id + 1;

  talkers.push(newTalker);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(HTTP_CREAT_OK).json(newTalker);
});

module.exports = router;