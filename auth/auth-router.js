const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model.js')

router.post('/register', (req, res) => {
  let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10)

    Users.register(user)
        .then(register => {
            res.status(201).json(register)
        })
        .catch(err => {
            res.status(500).json({ error: 'Error registering in' });
        })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

    Users.findUser({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user = user;

            res.status(200).json({ message: "Succeful login"})
        } else {
            res.status(401).json({ message: "Incorrect username or password" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Error logging in' });
    })
});

module.exports = router;
