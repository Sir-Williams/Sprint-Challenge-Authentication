const db = require('../database/dbConfig');

module.exports = {
    findUser,
    register
}

function findUser(filter) {
    return db('users').where(filter);
}

function register(user) {
    return db('users').insert(user)
}

