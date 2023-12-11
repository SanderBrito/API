let supplierCounter = 0;
let suppliersDatabase = [];

const SupplierManager = {
    createSupplier: function (name, mail, cnpj) {
        let newSupplier = { id: ++supplierCounter, name, mail, cnpj };
        suppliersDatabase.push(newSupplier);
        return newSupplier;
    },
    updateSupplier: function (id, name, mail, cnpj) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            let updatedSupplier = { id: parseInt(id), name, mail, cnpj };
            suppliersDatabase[index] = updatedSupplier;
            return updatedSupplier;
        }
        return null;
    },
    getAllSuppliers: function () {
        return suppliersDatabase;
    },
    getSuppliersByName: function (name) {
        return suppliersDatabase.filter(item => item.name.toUpperCase().startsWith(name.toUpperCase()));
    },
    getSuppliersByMail: function (mail) {
        return suppliersDatabase.filter(item => item.mail === mail);
    },
    getSupplierById: function (id) {
        let index = this.getIndexById(id);
        return index >= 0 ? suppliersDatabase[index] : null;
    },
    getIndexById: function (id) {
        for (let i = 0; i < suppliersDatabase.length; i++) {
            if (suppliersDatabase[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    deleteSupplier: function (id) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            suppliersDatabase.splice(index, 1);
            return true;
        }
        return false;
    }
};

module.exports = SupplierManager;
