const soloContieneDigitos = (str) => {
    return str.match(/\D/igm) == null ? true : false;
}

const validateRuc = async (req, res, next) => {
    /**
     * validaciones para ruc
     * 
     * debe ser contener solo digitos
     * debe tener un longitud de 11
     * (hay otras validaciones se deberan realizar con la api de la sunat)
     */
    if (!req.body.ruc) {
        next();
    } else {
        let ruc = req.body.ruc;
        if (!soloContieneDigitos(ruc)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El ruc debe tener solo numeros' });
        } else if (ruc.length !== 11) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El ruc debe tener 11 digitos' });
        } else {
            next();
        }
    }
}

module.exports = validateRuc;