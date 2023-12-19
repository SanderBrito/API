const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const User = require('../model/User');

router.get('/', async (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 15;
    
    try {
        const user = await User.findUser(page, perPage);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.post('/', Token.validateAccess, User.createUser)
router.delete('/:id', User.deleteUser)
router.put('/:id', User.updateUser)


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
        res.status(400).json({ message: "Falha ao alterar o registro no usuário" });
    }
});

module.exports = router;
