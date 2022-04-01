const soloContieneDigitos = (str) => {
    return str.match(/\D/igm) == null ? true : false;
}

const validateStock = async (req, res, next) => {
    if (!req.body.stock) {
        res.status(300);
        res.json({ severity: 'info', summary: '', detail: 'El stock es necesario' });
    } else {
        let stock = req.body.stock;
        stock = stock.replace(/\s/igm, '')
        if (!soloContieneDigitos(stock)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El stock debe ser un numero entero mayor a 0' });
        } else {
            req.body.stock = Number(stock);
            next();
        }
    }
}

module.exports = validateStock;