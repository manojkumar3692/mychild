const Datatypes = require('sequelize')
const db = require('../db/connection')
module.exports = db.sequelize.define('stocks', {
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true 
    },
    price: {
        type: Datatypes.STRING,
        allowNull: false
    },
    sku: {
        type: Datatypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: Datatypes.DATE,
    },
    updatedAt: {
        type: Datatypes.DATE,
    }
})
