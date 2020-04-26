const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3333;
const app = express();

// Necessario para o Express receber o formato JSON
app.use(express.json());
// Carregar o arquivo rotas
app.use(routes);

app.listen(PORT, () => {
  console.log('API online na porta', PORT);
});
