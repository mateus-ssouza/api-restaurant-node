const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Restaurante = require('./Restaurante');

const Endereco = db.define('Endereco', {
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

Restaurante.hasOne(Endereco, { as: 'endereco' , foreignKey: 'restauranteId' });

Endereco.sync({ alter: true });

module.exports = Endereco;
