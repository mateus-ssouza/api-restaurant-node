const { DataTypes } = require('sequelize');

const db = require('../db/conn');

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

Promocao.sync({ alter: true });

module.exports = Promocao;
