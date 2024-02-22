// Classe de Error customizada
module.exports = class CustomError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.name = 'CustomError';
        this.statusCode = statusCode;
    }
};