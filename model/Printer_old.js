let printerCounter = 0;
let printersDatabase = [];

const PrinterManager = {
    createPrinter: function (name, brand, model) {
        let newPrinter = { id: ++printerCounter, name, brand, model };
        printersDatabase.push(newPrinter);
        return newPrinter;
    },
    updatePrinter: function (id, name, brand, model) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            let updatedPrinter = { id: parseInt(id), name, brand, model };
            printersDatabase[index] = updatedPrinter;
            return updatedPrinter;
        }
        return null;
    },
    getAllPrinters: function () {
        return printersDatabase;
    },
    getPrintersByName: function (name) {
        return printersDatabase.filter(item => item.name.toUpperCase().startsWith(name.toUpperCase()));
    },
    getPrintersByBrand: function (brand) {
        return printersDatabase.filter(item => item.brand === brand);
    },
    getPrinterById: function (id) {
        let index = this.getIndexById(id);
        return index >= 0 ? printersDatabase[index] : null;
    },
    getIndexById: function (id) {
        for (let i = 0; i < printersDatabase.length; i++) {
            if (printersDatabase[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    deletePrinter: function (id) {
        let index = this.getIndexById(id);
        if (index >= 0) {
            printersDatabase.splice(index, 1);
            return true;
        }
        return false;
    }
};

module.exports = PrinterManager;
