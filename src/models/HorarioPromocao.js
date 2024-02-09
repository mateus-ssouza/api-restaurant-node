const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Promocao = require('./Promocao');

const HorarioPromocao = db.define('HorarioPromocao', {
    diaDaSemana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    },
    promocaoId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Promocao,
            key: 'id'
        }
    }
}, { timestamps: true });

HorarioPromocao.sync({ alter: true });

module.exports = HorarioPromocao;
