const User = require('../controller/user')
const ITEMS_PER_PAGE = 15;

const createUser = async (req, res) =>{   
    console.log(req.body.name_user)
    const name_user = req.body.name_user;
    const mail_user = req.body.mail_user;
    const pass_user = req.body.pass_user;
    const user ={
        name_user,
        mail_user,
        pass_user,
    }
    try{
        await User.create(user)

        res.status(201).json({message: "usuário cadastrado com sucesso!"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}
const carregaUser = async (req, res) =>{   
    console.log(req.body.name_user)
    const user1 ={
        name_user: "joao",
        mail_user:  "joao@joao.com",
        pass_user:  "123321",
    }
    const user2 ={
        name_user: "carlos",
        mail_user: "carlos@carlos.com",
        pass_user: "123321",
    }
    const user3 ={
        name_user: "pedro",
        mail_user: "pedro@pedro.com",
        pass_user: "123321",
    }
    const user4 ={
        name_user: "lucas",
        mail_user: "lucas@lucas.com",
        pass_user: "123321",
    }
    const user5 ={
        name_user: "marcelo",
        mail_user: "marcelo@marcelo.com",
        pass_user: "123321",
    }
    try{
        await User.create(user1)
        await User.create(user2)
        await User.create(user3)
        await User.create(user4)
        await User.create(user5)

        res.status(201).json({message: "usuários cadastrados com sucesso!"})

    }catch (error) {
        res.status(500).json({error: error})
    }
}

const findUser = async (page = 1, perPage = ITEMS_PER_PAGE) => {
    try {
        const user = await User.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
        return user

    } catch (error) {
        res.status(500).json({ error: error})
    }
}

const findOnlyUser = async (req, res) =>{
    const name_user = req.body
    console.log(name_user)

    try {
        const user = await User.findOne({ name_user: name_user })

        if(!user) {
            res.status(422).json({ message: 'usuário não encontrado!'})
        }
        return user
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}


const updateUser = async (req, res) =>{
    const {name_user, mail_user, pass_user} = req.body


    const user = {
        name_user,
        mail_user,
        pass_user,        
    }

    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, user)

        res.status(200).json({message: 'Cadastro Atualizado'})
        
    } catch (error) {
        res.status(500).json({ error: error})
    }
}



const deleteUser = async (req, res) =>{

    const user = await User.findOne({ _id: req.params.id })
    if(!user){
        res.status(422).json({ message: 'usuário não encontrado!' })
        return
    }

    try{
        await User.deleteOne({_id: req.params.id})

        res.status(200).json({ message: 'usuário deletado!' })
    }catch(error){
        res.status(500).json({ error: error })
    }

}

module.exports ={
    createUser,
    findUser,
    findOnlyUser,
    updateUser,
    deleteUser,
    carregaUser
}