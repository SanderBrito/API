const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const Printer = require('../model/Printer');

router.get('/', (req, res) => {
    // #swagger.summary = 'Método GET para listar impressoras por nome ou marca'
    let printerList = Printer.getAllPrinters();

    if (req.query.name) {
        printerList = Printer.getPrintersByName(req.query.name);
    } else if (req.query.brand) {
        printerList = Printer.getPrintersByBrand(req.query.brand);
    }

    res.json({ count: printerList.length, printers: printerList });
});

router.get('/:id', (req, res) => {
    // #swagger.summary = 'Método para listar por ID'
    let printer = Printer.getPrinterById(req.params.id);

    if (printer) {
        res.json({ printer: printer });
    } else {
        res.status(404).json({ message: "O ID informado não é válido" });
    }
});

router.post('/', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método PUT para cadastrar uma impressora'
    let { name, brand, model } = req.body;

    if (name && brand && model) {
        let newPrinter = Printer.createPrinter(name, brand, model);
        res.json({ printer: newPrinter });
    } else {
        res.status(400).json({ message: "Erro ao cadastrar a impressora" });
    }
});

router.put('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método PUT para atualizar o cadastro de uma impressoras através do ID'
    let { name, brand, model } = req.body;
    let id = req.params.id;

    if (id && name && brand && model) {
        let updatedPrinter = Printer.updatePrinter(id, name, brand, model);

        if (updatedPrinter) {
            res.json({ printer: updatedPrinter });
        } else {
            res.status(400).json({ message: "O ID informado não foi encontrado" });
        }
    } else {
        res.status(400).json({ message: "Falha ao alterar o registro na impressora" });
    }
});

router.delete('/:id', Token.validateAccess, (req, res) => {
    // #swagger.summary = 'Método DELETE para deletar uma impressoras através do seu ID'
    let id = req.params.id;

    if (Printer.deletePrinter(id)) {
        res.json({ message: "Elemento excluído com sucesso" });
    } else {
        res.status(400).json({ message: "Falha ao excluir o registro" });
    }
});

module.exports = router;
