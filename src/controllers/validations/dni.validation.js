const soloContieneDigitos = (str) => {
    return str.match(/\D/igm) == null ? true : false;
}

const validateDni = async (req, res, next) => {
    /**
     * validaciones para dni
     *
     * debe tener un longitud de 8
     * debe ser contener solo digitos
     * (hay otras validaciones se deberan realizar con la api de la reniec o sunat)
     */
    if (!req.body.dni) {
        next();
    } else {
        if (!soloContieneDigitos(req.body.dni)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El dni debe tener solo numeros' });
        } else if (dni.length !== 8) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El dni debe tener 8 caracteres' });
        } else {
            req.body.dni = String(dni);
            next();
        }
    }
}

module.exports = validateDni;