const db = require('../database/dbConfig');

module.exports = {
    findUser,
    register,
    getUsers
}

function findUser(filter) {
    return db('users').where(filter);
}

function register(user) {
    return db('users').insert(user)
}

function getUsers() {
    return db('users').select('id', 'username', 'password');
  }

