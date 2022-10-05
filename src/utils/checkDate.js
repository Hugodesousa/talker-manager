const checkDia = (dia) => dia > 0 && dia <= 31;

const checkMes = (mes) => mes > 0 && mes <= 12;

const checkAno = (ano) => ano > 1000 && ano < 4444;

const checkData = (date) => {
  const dateTest = date.split('/');
  const dateSplit = {
    dia: +dateTest[0],
    mes: +dateTest[1],
    ano: +dateTest[2],
  };

  return checkDia(dateSplit.dia) && checkMes(dateSplit.mes) && checkAno(dateSplit.ano);
};

module.exports = checkData;