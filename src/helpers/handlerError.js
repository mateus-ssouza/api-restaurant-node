/* eslint-disable no-unused-vars */
// Função para retornar o tratamento do erro na requisição
module.exports = (error, req, res, next) => {
    if (error && error.statusCode) {
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        });
    }
    else {
        console.log(error);
    }
};
