let userCounter = 0;
let usersDatabase = [];

const UserManager = {
    createUser: function (name, mail, pass) {
        let newUser = { id: ++userCounter, name, mail, pass };
        usersDatabase.push(newUser);
        return newUser;
    },
    updateUser: function (id, name, mail, pass) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            let updatedUser = { id: parseInt(id), name, mail, pass };
            usersDatabase[index] = updatedUser;
            return updatedUser;
        }
        return null;
    },
    getAllUsers: function () {
        return usersDatabase;
    },
    getUsersByName: function (name) {
        return usersDatabase.filter(item => item.name.toUpperCase().startsWith(name.toUpperCase()));
    },
    getUsersByBrand: function (mail) {
        return usersDatabase.filter(item => item.mail === mail);
    },
    getUserById: function (id) {
        let index = this.getIndexById(id);
        return index >= 0 ? usersDatabase[index] : null;
    },
    getIndexById: function (id) {
        for (let i = 0; i < usersDatabase.length; i++) {
            if (usersDatabase[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    deleteUser: function (id) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            usersDatabase.splice(index, 1);
            return true;
        }
        return false;
    }
};

module.exports = UserManager;
