const { body } = require('express-validator');

// Validação para criação de uma promoção
exports.createPromotionValidation = [
    body('descricao')
        .notEmpty()
        .withMessage('A descricao da promoção é obrigatória')
        .isLength({ min: 2, max: 80 })
        .withMessage('A descricao da promoção deve ter entre 2 e 80 caracteres'),

    body('precoPromocao')
        .notEmpty()
        .withMessage('O campo precoPromocao é obrigatório')
        .isNumeric()
        .withMessage('O precoPromocao deve ser um número')
        .toFloat()
        .isFloat({ min: 0 })
        .withMessage('O precoPromocao deve ser um número positivo'),

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

                if (!Object.prototype.hasOwnProperty.call(horario, 'inicioDaPromocao')) {
                    throw new Error('Cada horário deve ter a chave inicioDaPromocao');
                }

                if (!Object.prototype.hasOwnProperty.call(horario, 'fimDaPromocao')) {
                    throw new Error('Cada horário deve ter a chave fimDaPromocao');
                }

                if (typeof horario.diaDaSemana !== 'string' || horario.diaDaSemana.length < 1 || horario.diaDaSemana.length > 20) {
                    throw new Error('O campo diaDaSemana deve ter entre 1 e 20 caracteres');
                }

                const inicioDaPromocaoRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!inicioDaPromocaoRegex.test(horario.inicioDaPromocao)) {
                    throw new Error('O campo inicioDaPromocao deve estar no formato HH:mm');
                }

                const fimDaPromocaoRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!fimDaPromocaoRegex.test(horario.fimDaPromocao)) {
                    throw new Error('O campo fimDaPromocao deve estar no formato HH:mm');
                }
            }
            return true;
        })
];
