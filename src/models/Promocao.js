const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Produto = require('./Produto');

const Promocao = db.define('Promocao', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precoPromocao: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, { timestamps: true });

Produto.hasOne(Promocao, { as: 'produto' , foreignKey: 'produtoId' });

Promocao.sync({ alter: true });

module.exports = Promocao;
