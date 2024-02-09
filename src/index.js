const express = require('express');
require('dotenv').config();

const app = express();

// Configurar resposta JSON
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).send('Olá, Mundo!');
});

// Pasta pública para imagens
app.use(express.static('public'));

// Rotas
const ProdutoRoutes = require('./routes/ProdutoRoutes');

app.use('/produtos', ProdutoRoutes);

app.listen(process.env.PORT, () => { 
    console.log('Servidor executando!');
    console.log(`Acesse em: http://localhost:${process.env.PORT}/`);
});