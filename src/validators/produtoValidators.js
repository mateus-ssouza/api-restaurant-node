const { body } = require('express-validator');

// Validação para criação de um produto
exports.createProductValidation = [
    body('nome')
        .notEmpty()
        .withMessage('O nome do produto é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('O nome do produto deve ter entre 2 e 40 caracteres'),

    body('preco')
        .notEmpty()
        .withMessage('O campo preco é obrigatório')
        .isNumeric()
        .withMessage('O preco deve ser um número')
        .toFloat()
        .isFloat({ min: 0 })
        .withMessage('O preco deve ser um número positivo'),

    body('nomeCategoria')
        .notEmpty()
        .withMessage('O nome da categoria do produto é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('O nome nome da categoria deve ter entre 2 e 40 caracteres')
];


// Validação para edição de um produto
exports.editProductValidation = [
    body('nome')
        .notEmpty()
        .withMessage('O nome do produto é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('O nome do produto deve ter entre 2 e 40 caracteres'),

    body('preco')
        .notEmpty()
        .withMessage('O campo preco é obrigatório')
        .isNumeric()
        .withMessage('O preco deve ser um número')
        .toFloat()
        .isFloat({ min: 0 })
        .withMessage('O preco deve ser um número positivo'),

    body('nomeCategoria')
        .notEmpty()
        .withMessage('O nome da categoria do produto é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('O nome nome da categoria deve ter entre 2 e 40 caracteres')
];
