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

const carregaSupplier = async (req, res) =>{   
    console.log(req.body.name_user)
    const supplier1 ={
        name_supplier: "americanas",
        mail_supplier:  "americanas@americanas.com",
        cnpj_supplier:  "81.116.859/0001-65",
    }
    const supplier2 ={
        name_supplier: "dell",
        mail_supplier:  "dell@dell.com",
        cnpj_supplier:  "81.116.859/0005-65",
    }
    const supplier3 ={
        name_supplier: "HP",
        mail_supplier:  "hp@hp.com",
        cnpj_supplier:  "81.116.859/0008-65",
    }
    const supplier4 ={
        name_supplier: "lenovo",
        mail_supplier:  "lenovo@lenovo.com",
        cnpj_supplier:  "81.116.859/0009-65",
    }
    const supplier5 ={
        name_supplier: "brastemp",
        mail_supplier:  "brastemp@brastemp.com",
        cnpj_supplier:  "81.116.859/0010-65",
    }
    try{
        await Supplier.create(supplier1)
        await Supplier.create(supplier2)
        await Supplier.create(supplier3)
        await Supplier.create(supplier4)
        await Supplier.create(supplier5)

        res.status(201).json({message: "fornecedores cadastrados com sucesso!"})

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
    deleteSupplier,
    carregaSupplier
}