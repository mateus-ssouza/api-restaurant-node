const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Restaurante = db.define('Restaurante', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

Restaurante.sync({ alter: false });

module.exports = Restaurante;
