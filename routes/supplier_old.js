const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const Supplier = require('../model/Supplier');

router.get('/', (req, res) => {
    // #swagger.summary = 'Método GET para listar fornecedores por nome ou e-mail'
    let supplierList = Supplier.getAllSuppliers();

    if (req.query.name) {
        supplierList = Supplier.getSuppliersByName(req.query.name);
    } else if (req.query.mail) {
        supplierList = Supplier.getSuppliersByMail(req.query.mail);
    }

    res.json({ count: supplierList.length, suppliers: supplierList });
});

router.get('/:id', (req, res) => {
     // #swagger.summary = 'Método para listar por ID'
    let supplier = Supplier.getSupplierById(req.params.id);

    if (supplier) {
        res.json({ supplier: supplier });
    } else {
        res.status(404).json({ message: "O ID informado não é válido" });
    }
});

router.post('/', Token.validateAccess, (req, res) => {
     // #swagger.summary = 'Método PUT para cadastrar um fornecedor'
    let { name, mail, cnpj } = req.body;

    if (name && mail && cnpj) {
        let newSupplier = Supplier.createSupplier(name, mail, cnpj);
        res.json({ supplier: newSupplier });
    } else {
        res.status(400).json({ message: "Erro ao cadastrar a fornecedor" });
    }
});

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

router.delete('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método DELETE para deletar um fornecedor através do seu ID'
    let id = req.params.id;

    if (Supplier.deleteSupplier(id)) {
        res.json({ message: "Elemento excluído com sucesso" });
    } else {
        res.status(400).json({ message: "Falha ao excluir o registro" });
    }
});

module.exports = router;
