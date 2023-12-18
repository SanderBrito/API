const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const Supplier = require('../model/Supplier');

router.get('/', async (req, res) =>{
    const supplier = await Supplier.findSupplier()
    res.json(supplier)
})
router.post('/', Token.validateAccess, Supplier.createSupplier)
router.delete('/:id', Supplier.deleteSupplier)
router.put('/:id', Supplier.updateSupplier)


router.put('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método PUT para atualizar o cadastro de um fornecedor através do ID'
    let { name, mail, cnpj } = req.body;
    let id = req.params.id;

    if (id && name && mail && cnpj) {
        let updatedSupplier = Supplier.updateSupplier(id, name, mail, cnpj);

        if (updatedSupplier) {
            res.json({ supplier: updatedSupplier });
        } else {
            res.status(400).json({ message: "O ID informado não foi encontrado" });
        }
    } else {
        res.status(400).json({ message: "Falha ao alterar o registro no fornecedor" });
    }
});

module.exports = router;
