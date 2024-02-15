const { DataTypes } = require('sequelize');

const db = require('../db/conn');
const Categoria = require('./Categoria');
const Restaurante = require('./Restaurante');

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
    }
}, { timestamps: true });

Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Restaurante.hasMany(Produto, { as: 'produtos' , foreignKey: 'restauranteId' });

Produto.sync({ alter: true });

module.exports = Produto;
