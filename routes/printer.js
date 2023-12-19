const express = require('express');
const router = express.Router();

const Token = require('../utilities/Token');
const Printer = require('../model/Printer');

router.get('/', async (req, res) =>{
    // #swagger.summary = 'Método GET para exibir impressoras cadastradas, 15 por página'
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 15;
    
    try {
        const printer = await Printer.findPrinter(page, perPage);
        res.json(printer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.post('/', Token.validateAccess, Printer.createPrinter)
router.delete('/:id', Printer.deletePrinter)
router.put('/:id', Printer.updatePrinter)


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

router.get('/report', async (req, res) => {
    // #swagger.summary = 'Método GET para exibir relatório de impressoras por marca'
    try {
        const printers = await Printer.findPrinter();

        if (!printers || printers.length === 0) {
            return res.status(404).json({ message: 'Nenhuma impressora encontrada para exibir.' });
        }

        const report = {};

        printers.forEach(printer => {
            const brand = printer.brand_printer;

            if (!report[brand]) {
                report[brand] = [];
            }

            report[brand].push({
                Name: printer.name_printer,
                Model: printer.model_printer,
            });
        });

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/install', Token.validateAccess, Printer.carregaPrinter);

module.exports = router;
