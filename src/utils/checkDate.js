const checkDia = (dia) => {
  const test = dia > 0 && dia < 31;
  if (test) {
    return true;
  }
  return false;
};

const checkMes = (mes) => {
  const test = mes > 0 && mes < 12;
  if (test) {
    return true;
  }
  return false;
};

const checkAno = (ano) => {
  const test = ano > 1000 && ano < 4444;
  if (test) {
    return true;
  }
  return false;
};

const checkData = (data) => {
  const dateTest = data.split('/');
  const dia = +dateTest[0];
  const mes = +dateTest[1];
  const ano = +dateTest[2];

  if (checkDia(dia) && checkMes(mes) && checkAno(ano)) {
    return true;
  }
  return false;
};

module.exports = checkData;