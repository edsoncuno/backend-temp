const soloContieneDigitos = (str) => {
    return str.match(/\D/igm) == null ? true : false;
}

const validateRuc = async (req, res, next) => {
    /**
     * validaciones para ruc
     * 
     * eliminar posible espacios del string
     * debe tener un longitud de 11
     * debe ser contener solo digitos
     * (hay otras validaciones se deberan realizar con la api de la sunat)
     */
    if (!req.body.ruc) {
        next();
    } else {
        let ruc = req.body.ruc;
        ruc = ruc.replace(/\s/igm, '')
        if (ruc.length !== 11) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El ruc debe tener 11 caracteres' });
        } else if (!soloContieneDigitos(ruc)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El ruc debe tener solo numeros' });
        } else {
            next();
        }
    }
}

module.exports = validateRuc;