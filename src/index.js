const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (request, response) => {
    response.status(200).send('Olá, Mundo!');
});

app.listen(process.env.PORT, () => { 
    console.log('Servidor executando!');
    console.log(`Acesse em: http://localhost:${process.env.PORT}/`);
});