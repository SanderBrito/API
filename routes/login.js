const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')




router.post("/login", (req, res) => {
    // #swagger.summary = 'Gera um JWT se as condições de login forem atendidas'
    let {usuario, senha} = req.body
    if (usuario && senha && usuario !== senha && senha.length >= 5) {
        let token = jwt.sign({ usuario: usuario }, 'calvin', { expiresIn: '15 min' });
        res.json({ logged: true, token: token });
    } else {
        res.status(403).json({ logged: false, mensagem: 'Usuário e senha inválidos!' });
    }
    });

module.exports = router