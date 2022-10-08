const checkData = require('./checkDate');

const HTTP_BAD_STATUS = 400;
const HTTP_BAD_AUTHORIZATION = 401;

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_BAD_AUTHORIZATION).json({ 
      message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(HTTP_BAD_AUTHORIZATION).json({ 
      message: 'Token inválido' });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_STATUS).json({
       message: 'O campo "age" é obrigatório' });
  }
  if (typeof (age) === 'number' && age < 18) {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalker1 = (req, res, next) => {
  if (!req.body.talk) {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'O campo "talk" é obrigatório' });
  }
  const { talk } = req.body;

  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'O campo "watchedAt" é obrigatório' });
  }
  
  if (!checkData(talk.watchedAt)) {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

const validTalker2 = (req, res, next) => {
  const { rate } = req.body.talk;

  const newRate = Number(rate);
  if (newRate < 1 || newRate > 5) {
    return res.status(HTTP_BAD_STATUS).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!newRate) {
      return res.status(HTTP_BAD_STATUS).json({ message: 'O campo "rate" é obrigatório' });
    }
  next();
};

module.exports = {
  validToken,
  validName,
  validAge,
  validTalker1,
  validTalker2,
};