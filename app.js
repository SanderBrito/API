const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

//app.use('/installer', installerRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

PrinterRouter = require('./routes/printer')
app.use('/Printer', PrinterRouter)

LoginRouter = require('./routes/login')
app.use('/', LoginRouter)

UserRouter = require('./routes/user')
app.use('/User', UserRouter)

SupplierRouter = require('./routes/supplier')
app.use('/Supplier', SupplierRouter)

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_doc.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'.rh0qk9n.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority')

.then(() =>{
    console.log("Conectado ao mongo")
    app.listen(3000, () =>{
        console.log('Servidor iniciado...')
    })
})
.catch((err) => console.log(err))



module.exports = app;