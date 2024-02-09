const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Categoria = require('./Categoria');

const Produto = db.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        }
    }
}, { timestamps: true });

Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

Produto.sync({ alter: true });

module.exports = Produto;
