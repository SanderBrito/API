const express = require('express');
const app = express();

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

app.listen(3000, () => {
    console.log("Aplicação Online! ")
})