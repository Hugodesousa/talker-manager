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

// router.get('/talker/search?q=')

router.put('/talker/:id',
validToken,
validName,
validAge,
validTalker1,
validTalker2, 
async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  const { params } = req;
  const findTalkers = talkers.findIndex((talker) => talker.id === +params.id);
  const { id } = talkers[findTalkers];
  const newEditTalker = { id, ...req.body };
  const remove = talkers.filter((el) => el.id !== +params.id);
  remove.push(newEditTalker);

  await fs.writeFile(pathTalker, JSON.stringify(remove));
  res.status(HTTP_OK_STATUS).json(newEditTalker);
});

router.post('/talker', 
validToken, 
validName, 
validAge, 
validTalker1, 
validTalker2, 
async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  const newTalker = req.body;
  newTalker.id = talkers[talkers.length - 1].id + 1;

  talkers.push(newTalker);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(HTTP_CREAT_OK).json(newTalker);
});

router.delete('/talker/:id', validToken, async (req, res) => {
  // const id = Number(req.params.id);
  const talkers = JSON.parse(await fs.readFile(pathTalker));
  console.log(talkers);

  // const editTalker = talkers.find((talker) => talker.id === +req.params.id);
  
  // if (talker) {
  //   const index = talkers.indexOf(talker);
  //   console.log(index);
  //   talkers.splice(index, 1);
  // }
  res.status(204).end();
});

module.exports = router; 