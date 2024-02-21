const resolver = (handler) => {
    return (req, res, next) => {
        return Promise
            .resolve(handler(req, res, next))
            .catch(e => next(e));
    };
};

module.exports = { resolver };
