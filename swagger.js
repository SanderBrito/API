const swaggerAutogen = require('swagger-autogen')()
output = 'swagger_doc.json'
endpoints = ['./routes/login.js', './routes/printer.js', './routes/supplier.js', './routes/user.js']

swaggerAutogen(output, endpoints)