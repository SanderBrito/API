const mongoose = require('mongoose')

const Supplier = mongoose.model('Supplier', {
    name_supplier: String,
    mail_supplier: String,
    cnpj_supplier: String,
})

module.exports = Supplier