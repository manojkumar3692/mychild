const Datatypes = require('sequelize')
const db = require('../db/connection')
module.exports = db.sequelize.define('users', {
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Datatypes.DATE,
    },
    updatedAt: {
        type: Datatypes.DATE,
    }
})