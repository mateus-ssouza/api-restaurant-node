const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Categoria = db.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

Categoria.sync({ alter: true });

module.exports = Categoria;
