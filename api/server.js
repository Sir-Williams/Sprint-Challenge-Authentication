const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const connectSessionStore = require ('connect-session-knex')
const db = require('../database/dbConfig.js')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const knexSessionStore = connectSessionStore(session)

const server = express();

const sessionConfig = {
    name: 'user session',
    secret: 'the opposite of yeet is to yoink',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidefieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', authenticate);

server.get("/", (req, res) => {
    res.json({ message: "This is a site." });
  });

module.exports = server;
