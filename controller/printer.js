const mongoose = require('mongoose')

const Printer = mongoose.model('Printer', {
    name_printer: String,
    brand_printer: String,
    model_printer: String,
})

module.exports = Printer