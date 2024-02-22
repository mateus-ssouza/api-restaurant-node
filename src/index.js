const express = require('express');
require('dotenv').config();

const app = express();

// Configurar resposta JSON
app.use(express.json());

// Pasta pública para imagens
app.use(express.static('public'));

// Rotas
const RestauranteRoutes = require('./routes/RestauranteRoutes');
app.use('/restaurantes', RestauranteRoutes);

// Tratamento de erros
const errorHandler = require('./helpers/handlerError');
app.use(errorHandler);

app.listen(process.env.PORT, () => { 
    console.log('Servidor executando!');
    console.log(`Acesse em: http://localhost:${process.env.PORT}/`);
});