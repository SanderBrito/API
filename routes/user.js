const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const User = require('../model/User');

router.get('/', (req, res) => {
    // #swagger.summary = 'Método GET para listar usuários por nome ou e-mail'
    let userList = User.getAllUsers();

    if (req.query.name) {
        userList = User.getUsersByName(req.query.name);
    } else if (req.query.mail) {
        userList = User.getUsersByMail(req.query.mail);
    }

    res.json({ count: userList.length, users: userList });
});

router.get('/:id', (req, res) => {
    // #swagger.summary = 'Método para listar por ID'
    let user = User.getUserById(req.params.id);

    if (user) {
        res.json({ user: user });
    } else {
        res.status(404).json({ message: "O ID informado não é válido" });
    }
});

router.post('/', Token.validateAccess, (req, res) => {
     // #swagger.summary = 'Método PUT para cadastrar um usuário'
    let { name, mail, pass } = req.body;

    if (name && mail && pass) {
        let newUser = User.createUser(name, mail, pass);
        res.json({ user: newUser });
    } else {
        res.status(400).json({ message: "Erro ao cadastrar usuário" });
    }
});

router.put('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método PUT para atualizar o cadastro de um usuário através do ID'
    let { name, mail, pass } = req.body;
    let id = req.params.id;

    if (id && name && mail && pass) {
        let updatedUser = User.updateUser(id, name, mail, pass);

        if (updatedUser) {
            res.json({ user: updatedUser });
        } else {
            res.status(400).json({ message: "O ID informado não foi encontrado" });
        }
    } else {
        res.status(400).json({ message: "Falha ao alterar o registro na usuário" });
    }
});

router.delete('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método DELETE para deletar um usuário através do seu ID'
    let id = req.params.id;

    if (User.deleteUser(id)) {
        res.json({ message: "Elemento excluído com sucesso" });
    } else {
        res.status(400).json({ message: "Falha ao excluir o registro" });
    }
});

module.exports = router;
