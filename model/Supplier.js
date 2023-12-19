const Supplier = require('../controller/supplier')
const ITEMS_PER_PAGE = 15;

const createSupplier = async (req, res) =>{   
    console.log(req.body.name_supplier)
    const name_supplier = req.body.name_supplier;
    const mail_supplier = req.body.mail_supplier;
    const cnpj_supplier = req.body.cnpj_supplier;
    const supplier ={
        name_supplier,
        mail_supplier,
        cnpj_supplier,
    }
    try{
        await Supplier.create(supplier)

        res.status(201).json({message: "fornecedor cadastrado com sucesso!"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findSupplier = async (page = 1, perPage = ITEMS_PER_PAGE) => {
    try {
        const supplier = await Supplier.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
        return supplier

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findOnlySupplier = async (req, res) =>{
    const name_supplier = req.body
    console.log(name_supplier)

    try {
        const supplier = await Supplier.findOne({ name_supplier: name_supplier })

        if(!supplier) {
            res.status(422).json({ message: 'fornecedor não encontrado!'})
        }
        return supplier
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}


const updateSupplier = async (req, res) =>{
    const {name_supplier, mail_supplier, cnpj_supplier} = req.body


    const supplier = {
        name_supplier,
        mail_supplier,
        cnpj_supplier,        
    }

    try {
        const updateSupplier = await Supplier.updateOne({ _id: req.params.id }, supplier)

        res.status(200).json({message: 'Cadastro Atualizado'})
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}



const deleteSupplier = async (req, res) =>{

    const supplier = await Supplier.findOne({ _id: req.params.id })
    if(!supplier){
        res.status(422).json({ message: 'fornecedor não encontrado!' })
        return
    }

    try{
        await Supplier.deleteOne({_id: req.params.id})

        res.status(200).json({ message: 'fornecedor deletado!' })
    }catch(error){
        res.status(500).json({ error: error })
    }

}

module.exports ={
    createSupplier,
    findSupplier,
    findOnlySupplier,
    updateSupplier,
    deleteSupplier
}