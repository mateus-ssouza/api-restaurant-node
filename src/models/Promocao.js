const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Produto = require('./Produto');
const HorarioPromocao = require('./HorarioPromocao');

const Promocao = db.define('Promocao', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precoPromocao: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    produtoId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Produto,
            key: 'id'
        }
    }
}, { timestamps: true });

Produto.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });
Promocao.hasMany(HorarioPromocao, { foreignKey: 'promocaoId' });

Promocao.sync({ alter: true });

module.exports = Promocao;
