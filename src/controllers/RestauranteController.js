const Restaurante = require('../models/Restaurante');
const Endereco = require('../models/Endereco');
const HorarioRestaurante = require('../models/HorarioRestaurante');
const db = require('../db/conn');

module.exports = class RestauranteController {

    static async create(req, res) {

        const {
            nomeRestaurante,
            foto,
            rua,
            numero,
            complemento,
            cidade,
            estado,
            horarios
        } = req.body;

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            const restaurante = await Restaurante.create({
                nome: nomeRestaurante,
                foto: foto
            }, { transaction: transacao });

            const endereco = await Endereco.create({
                rua: rua,
                numero: numero,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                restauranteId: restaurante.id
            }, { transaction: transacao });

            // Criar os horários do restaurante
            if (horarios && horarios.length > 0) {
                await Promise.all(horarios.map(async (horario) => {
                    await HorarioRestaurante.create({
                        diaDaSemana: horario.diaDaSemana,
                        abertura: horario.abertura,
                        fechamento: horario.fechamento,
                        restauranteId: restaurante.id
                    }, { transaction: transacao });
                }));
            }

            // Commit a transação
            await transacao.commit();

            res.status(201).json({
                message: 'Restaurante cadastrado com sucesso!',
                Restaurante: restaurante,
                Endereco: endereco
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {

        Restaurante.findAll({
            include: [
                {
                    model: Endereco,
                    as: 'endereco',
                    attributes: ['id', 'rua', 'numero', 'complemento', 'cidade', 'estado']
                },
                {
                    model: HorarioRestaurante,
                    as: 'horarios',
                    attributes: ['id', 'diaDaSemana', 'abertura', 'fechamento']
                }
            ],
        })
            .then((data) => {
                // { plain: true }, converte o objeto result em um objeto simples
                // removendo os metadados adicionais da consulta.
                const restaurantes = data.map((result) => result.get({ plain: true }));

                res.status(200).json({
                    restaurantes: restaurantes,
                });
            })
            .catch((err) => console.log(err));
    }
};