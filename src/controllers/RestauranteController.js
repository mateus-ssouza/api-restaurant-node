const Restaurante = require('../models/Restaurante');
const Endereco = require('../models/Endereco');
const HorarioRestaurante = require('../models/HorarioRestaurante');
const db = require('../db/conn');
const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const Promocao = require('../models/Promocao');
const HorarioPromocao = require('../models/HorarioPromocao');

module.exports = class RestauranteController {

    static async createRestaurant(req, res) {

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

    static async getAllRestaurant(req, res) {

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

    static async getRestaurantById(req, res) {

        const id = req.params.id;

        const restaurante = await Restaurante.findOne(
            {
                where: { id: id },
                attributes: ['id', 'nome', 'foto'],
                include: [
                    {
                        model: Endereco,
                        as: 'endereco',
                        attributes: ['rua', 'numero', 'complemento', 'cidade', 'estado']
                    },
                    {
                        model: HorarioRestaurante,
                        as: 'horarios',
                        attributes: ['diaDaSemana', 'abertura', 'fechamento']
                    }
                ]
            }
        );

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        res.status(200).json({ restaurante });
    }

    static async editRestaurant(req, res) {

        const id = req.params.id;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const restauranteDados = {
            nome: req.body.nomeRestaurante,
            foto: req.body.foto
        };

        const enderecoDados = {
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            cidade: req.body.cidade,
            estado: req.body.estado
        };

        const horariosDados = req.body.horarios;

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            await Restaurante.update(restauranteDados, { where: { id: id }, transaction: transacao });
            await Endereco.update(enderecoDados, { where: { restauranteId: id }, transaction: transacao });

            // Atualizar os horários do restaurante
            if (horariosDados && horariosDados.length > 0) {
                await Promise.all(horariosDados.map(async (horario) => {
                    await HorarioRestaurante.update({
                        diaDaSemana: horario.diaDaSemana,
                        abertura: horario.abertura,
                        fechamento: horario.fechamento
                    }, {
                        where: { restauranteId: id, diaDaSemana: horario.diaDaSemana },
                        transaction: transacao
                    });
                }));
            }

            // Commit a transação
            await transacao.commit();

            res.status(200).json({
                message: 'Restaurante atualizado com sucesso!'
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async removeRestaurant(req, res) {

        const id = req.params.id;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            await Endereco.destroy({ where: { restauranteId: id }, transaction: transacao });
            await HorarioRestaurante.destroy({ where: { restauranteId: id }, transaction: transacao });
            await Restaurante.destroy({ where: { id: id }, transaction: transacao });

            // Commit a transação
            await transacao.commit();

            res.status(200).json({
                message: 'Restaurante removido com sucesso!'
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async createProduct(req, res) {

        const id = req.params.id;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const {
            nome,
            preco,
            foto,
            nomeCategoria
        } = req.body;
        
        const transacao = await db.transaction(); // Iniciar uma transação

        try {
            // Verifique se a categoria já existe
            let categoria = await Categoria.findOne({ where: { nome: nomeCategoria }, transaction: transacao });

            // Se não existir, crie uma nova categoria
            if (!categoria) {
                categoria = await Categoria.create({ nome: nomeCategoria }, { transaction: transacao });
            }

            // Crie o produto associado à categoria
            const novoProduto = await Produto.create({
                nome: nome,
                preco: preco,
                foto: foto,
                categoriaId: categoria.id,
                restauranteId: id
            }, { transaction: transacao });

            // Commit a transação
            await transacao.commit();

            res.status(201).json({
                message: 'Produto cadastrado com sucesso!',
                Produto: novoProduto,
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async getAllProductsOfRestaurant(req, res) {

        const id = req.params.id;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        Produto.findAll({
            attributes: ['nome', 'preco', 'foto'],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome']
                }
            ],
        })
            .then((data) => {
                // { plain: true }, converte o objeto result em um objeto simples
                // removendo os metadados adicionais da consulta.
                const produtos = data.map((result) => result.get({ plain: true }));

                res.status(200).json({
                    produtos: produtos,
                });
            })
            .catch((err) => console.log(err));
    }

    static async editProduct(req, res) {

        const { id, idProduto } = req.params;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const produto = await Produto.findOne({ where: { id: idProduto } });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado!' });
            return;
        }

        const {
            nome,
            preco,
            foto,
            nomeCategoria
        } = req.body;

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            // Verifique se a categoria já existe
            let categoria = await Categoria.findOne({ where: { nome: nomeCategoria }, transaction: transacao });

            // Se não existir, crie uma nova categoria
            if (!categoria) {
                categoria = await Categoria.create({ nome: nomeCategoria }, { transaction: transacao });
            }

            const produtoDados = {
                nome: nome,
                preco: preco,
                foto: foto,
                categoriaId: categoria.id
            };

            await Produto.update(produtoDados, { where: { id: idProduto }, transaction: transacao });

            // Commit a transação
            await transacao.commit();

            res.status(200).json({
                message: 'Produto atualizado com sucesso!'
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async removeProduct(req, res) {

        const { id, idProduto } = req.params;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const produto = await Produto.findOne({ where: { id: idProduto } });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado!' });
            return;
        }

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            await Produto.destroy({ where: { id: idProduto , restauranteId: id }, transaction: transacao });
            
            // Commit a transação
            await transacao.commit();

            res.status(200).json({
                message: 'Produto removido com sucesso!'
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async addPromotion(req, res) {

        const { id, idProduto } = req.params;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const produto = await Produto.findOne({ where: { id: idProduto } });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado!' });
            return;
        }

        const {
            descricao,
            precoPromocao,
            horarios
        } = req.body;
        
        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            const promocao = await Promocao.create({
                descricao: descricao,
                precoPromocao: precoPromocao,
                produtoId: idProduto
            }, { transaction: transacao });

            // Criar os horários do restaurante
            if (horarios && horarios.length > 0) {
                await Promise.all(horarios.map(async (horario) => {
                    await HorarioPromocao.create({
                        diaDaSemana: horario.diaDaSemana,
                        inicioDaPromocao: horario.inicioDaPromocao,
                        fimDaPromocao: horario.fimDaPromocao,
                        promocaoId: promocao.id
                    }, { transaction: transacao });
                }));
            }

            // Commit a transação
            await transacao.commit();

            res.status(201).json({
                message: 'Promoção atribuída ao produto com sucesso!',
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }

    static async removePromotion(req, res) {

        const { id, idProduto } = req.params;

        const restaurante = await Restaurante.findOne({ where: { id: id } });

        if (!restaurante) {
            res.status(404).json({ message: 'Restaurante não encontrado!' });
            return;
        }

        const produto = await Produto.findOne({ where: { id: idProduto } });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado!' });
            return;
        }

        const promocao = await Promocao.findOne({ where: { produtoId: idProduto } });

        if (!promocao) {
            res.status(404).json({ message: 'Este produto não possui promoção!' });
            return;
        }

        const transacao = await db.transaction(); // Iniciar uma transação

        try {

            await HorarioPromocao.destroy({ where: { promocaoId: promocao.id }, transaction: transacao });
            await Promocao.destroy({ where: { id: promocao.id }, transaction: transacao });

            // Commit a transação
            await transacao.commit();

            res.status(200).json({
                message: 'Promoção removida com sucesso!'
            });
        } catch (error) {
            // Rollback em caso de erro
            await transacao.rollback();
            res.status(500).json({ message: error });
        }
    }
};