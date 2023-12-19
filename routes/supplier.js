const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const Supplier = require('../model/Supplier');

router.get('/', async (req, res) =>{
    // #swagger.summary = 'Método GET para exibir fornecedores cadastrados, 15 por página'
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 15;
    
    try {
        const supplier = await Supplier.findSupplier(page, perPage);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

router.get('/report', async (req, res) => {
    // #swagger.summary = 'Método GET para exibir relatório de fornecedores nome'
    try {
        const suppliers = await Supplier.findSupplier();

        if (!suppliers || suppliers.length === 0) {
            return res.status(404).json({ message: 'Nenhum fornecedor encontrado para exibir.' });
        }

        const report = {};

        suppliers.forEach(supplier => {
            const name = supplier.name_supplier;

            if (!report[name]) {
                report[name] = [];
            }

            report[name].push({
                Name: supplier.name_supplier,
                Email: supplier.mail_supplier,
                CNPJ: supplier.cnpj_supplier,
            });
        });

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
