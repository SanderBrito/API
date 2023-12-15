const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name_user: String,
    mail_user: String,
    pass_user: String,
})

module.exports = User