const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const db = require('../db/conn');

module.exports = class ProdutoController {

    static async create(req, res) {
        const nome = req.body.nome;
        const preco = req.body.preco;
        const foto = req.body.foto;
        const nomeCategoria = req.body.nomeCategoria;

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
                categoriaId: categoria.id
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

    static async getAll(req, res) {

        Produto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nome']
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
};