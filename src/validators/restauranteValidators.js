const { body } = require('express-validator');

// Validação para criação de restaurante
exports.createRestaurantValidation = [
    body('nomeRestaurante')
        .notEmpty()
        .withMessage('O nome do restaurante é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('O nome do restaurante deve ter entre 2 e 40 caracteres'),

    body('rua')
        .notEmpty()
        .withMessage('O campo rua é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('A rua deve ter entre 2 e 40 caracteres'),

    body('numero')
        .notEmpty()
        .withMessage('O campo número é obrigatório')
        .isLength({ min: 1, max: 7 })
        .withMessage('O número deve ter entre 1 e 7 caracteres'),

    body('complemento')
        .optional({ nullable: true })
        .isLength({ min: 2, max: 70 })
        .withMessage('O complemento deve ter entre 2 e 70 caracteres'),

    body('cidade')
        .notEmpty()
        .withMessage('O campo cidade é obrigatório')
        .isLength({ min: 2, max: 30 })
        .withMessage('A cidade deve ter entre 2 e 30 caracteres'),

    body('estado')
        .notEmpty()
        .withMessage('O campo estado é obrigatório')
        .isLength({ min: 2, max: 2 })
        .withMessage('O estado deve ter exatamente 2 caracteres'),
];


// Validação para edição de restaurante
exports.editRestaurantValidation = [
    body('nomeRestaurante')
        .notEmpty()
        .withMessage('O nome do restaurante é obrigatório')
        .isLength({ min: 2, max: 40 }).withMessage('O nome do restaurante deve ter entre 2 e 40 caracteres'),

    body('rua')
        .notEmpty()
        .withMessage('O campo rua é obrigatório')
        .isLength({ min: 2, max: 40 })
        .withMessage('A rua deve ter entre 2 e 40 caracteres'),

    body('numero')
        .notEmpty()
        .withMessage('O campo número é obrigatório')
        .isLength({ min: 1, max: 7 })
        .withMessage('O número deve ter entre 1 e 7 caracteres'),

    body('complemento')
        .optional({ nullable: true })
        .isLength({ min: 2, max: 70 })
        .withMessage('O complemento deve ter entre 2 e 70 caracteres'),

    body('cidade')
        .notEmpty()
        .withMessage('O campo cidade é obrigatório')
        .isLength({ min: 2, max: 30 })
        .withMessage('A cidade deve ter entre 2 e 30 caracteres'),

    body('estado')
        .notEmpty()
        .withMessage('O campo estado é obrigatório')
        .isLength({ min: 2, max: 2 })
        .withMessage('O estado deve ter exatamente 2 caracteres')
];
