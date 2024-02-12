const express = require('express');
require('dotenv').config();

const app = express();

// Configurar resposta JSON
app.use(express.json());

// Pasta pública para imagens
app.use(express.static('public'));

// Rotas
const ProdutoRoutes = require('./routes/ProdutoRoutes');
const RestauranteRoutes = require('./routes/RestauranteRoutes');

app.use('/produtos', ProdutoRoutes);
app.use('/restaurantes', RestauranteRoutes);

app.listen(process.env.PORT, () => { 
    console.log('Servidor executando!');
    console.log(`Acesse em: http://localhost:${process.env.PORT}/`);
});