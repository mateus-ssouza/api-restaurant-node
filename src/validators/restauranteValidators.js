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

    body('horarios')
        .notEmpty()
        .withMessage('Os horários precisam ser enviados')
        .isArray({ min: 1 })
        .withMessage('A lista de horários não pode estar vazia')
        .custom((value) => {
            for (const horario of value) {
                if (typeof horario !== 'object') {
                    throw new Error('Cada horário deve ser um objeto');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'diaDaSemana')) {
                    throw new Error('Cada horário deve ter a chave diaDaSemana');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'abertura')) {
                    throw new Error('Cada horário deve ter a chave abertura');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'fechamento')) {
                    throw new Error('Cada horário deve ter a chave fechamento');
                }

                if (typeof horario.diaDaSemana !== 'string' || horario.diaDaSemana.length < 1 || horario.diaDaSemana.length > 20) {
                    throw new Error('O campo diaDaSemana deve ter entre 1 e 20 caracteres');
                }

                const aberturaRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!aberturaRegex.test(horario.abertura)) {
                    throw new Error('O campo abertura deve estar no formato HH:mm');
                }

                const fechamentoRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!fechamentoRegex.test(horario.fechamento)) {
                    throw new Error('O campo fechamento deve estar no formato HH:mm');
                }
            }
            return true;
        })
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
        .withMessage('O estado deve ter exatamente 2 caracteres'),

    body('horarios')
        .notEmpty()
        .withMessage('Os horários precisam ser enviados')
        .isArray({ min: 1 }).withMessage('A lista de horários não pode estar vazia')
        .custom((value) => {
            for (const horario of value) {
                if (typeof horario !== 'object') {
                    throw new Error('Cada horário deve ser um objeto');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'diaDaSemana')) {
                    throw new Error('Cada horário deve ter a chave diaDaSemana');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'abertura')) {
                    throw new Error('Cada horário deve ter a chave abertura');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'fechamento')) {
                    throw new Error('Cada horário deve ter a chave fechamento');
                }

                if (typeof horario.diaDaSemana !== 'string' || horario.diaDaSemana.length < 1 || horario.diaDaSemana.length > 20) {
                    throw new Error('O campo diaDaSemana deve ter entre 1 e 20 caracteres');
                }

                const aberturaRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!aberturaRegex.test(horario.abertura)) {
                    throw new Error('O campo abertura deve estar no formato HH:mm');
                }

                const fechamentoRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!fechamentoRegex.test(horario.fechamento)) {
                    throw new Error('O campo fechamento deve estar no formato HH:mm');
                }
            }
            return true;
        })
];
