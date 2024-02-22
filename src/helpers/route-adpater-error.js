// Função para envolver controllers e o tratar erros na requisição
const resolver = (handler) => {
    return (req, res, next) => {
        return Promise
            .resolve(handler(req, res, next))
            .catch(e => next(e));
    };
};

module.exports = { resolver };
