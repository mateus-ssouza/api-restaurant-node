const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Promocao = require('./Promocao');

const HorarioPromocao = db.define('HorarioPromocao', {
    diaDaSemana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inicioDaPromocao: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fimDaPromocao: {
        type: DataTypes.TIME,
        allowNull: false
    },
}, { timestamps: true });

Promocao.hasMany(HorarioPromocao, { as: 'horarios' , foreignKey: 'promocaoId' });

HorarioPromocao.sync({ alter: true });

module.exports = HorarioPromocao;
