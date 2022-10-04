function randomToken() {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
}

module.exports = randomToken;

// REFERENCIA DA FUNÇAO 'randomToken': https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/