const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const HorarioPromocao = db.define('HorarioPromocao', {
    diaDaSemana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true });

HorarioPromocao.sync({ alter: true });

module.exports = HorarioPromocao;
