const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Restaurante = require('./Restaurante');

const HorarioRestaurante = db.define('HorarioRestaurante', {
    diaDaSemana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abertura: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fechamento: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, { timestamps: true });

Restaurante.hasMany(HorarioRestaurante, { as: 'horarios' , foreignKey: 'restauranteId' });

HorarioRestaurante.sync({ alter: true });

module.exports = HorarioRestaurante;
