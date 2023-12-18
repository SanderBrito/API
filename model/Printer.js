const Printer = require('../controller/printer')

const createPrinter = async (req, res) =>{   
    console.log(req.body.name_printer)
    const name_printer = req.body.name_printer;
    const brand_printer = req.body.brand_printer;
    const model_printer = req.body.model_printer;
    const printer ={
        name_printer,
        brand_printer,
        model_printer,
    }
    try{
        await Printer.create(printer)

        res.status(201).json({message: "impressora cadastrada com sucesso!"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findPrinter = async (req, res) =>{
    try {
        const printer = await Printer.find()
        return printer

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findOnlyPrinter = async (req, res) =>{
    const name_printer = req.body
    console.log(name_printer)

    try {
        const printer = await Printer.findOne({ name_printer: name_printer })

        if(!printer) {
            res.status(422).json({ message: 'impressora não encontrada!'})
        }
        return printer
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}


const updatePrinter = async (req, res) =>{
    const {name_printer, brand_printer, model_printer} = req.body


    const printer = {
        name_printer,
        brand_printer,
        model_printer,        
    }

    try {
        const updatePrinter = await Printer.updateOne({ _id: req.params.id }, printer)

        res.status(200).json({message: 'Cadastro Atualizado'})
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}



const deletePrinter = async (req, res) =>{

    const printer = await Printer.findOne({ _id: req.params.id })
    if(!printer){
        res.status(422).json({ message: 'impressora não encontrada!' })
        return
    }

    try{
        await Printer.deleteOne({_id: req.params.id})

        res.status(200).json({ message: 'impressora deletada!' })
    }catch(error){
        res.status(500).json({ error: error })
    }

}

module.exports ={
    createPrinter,
    findPrinter,
    findOnlyPrinter,
    updatePrinter,
    deletePrinter
}