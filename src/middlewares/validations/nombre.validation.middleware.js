const soloContieneLetrasEspacios = (str) => {
    return str.match(/[^a-z\s]/igm) == null ? true : false
}

const validateNombre = async (req, res, next) => {
    /**
     *validaciones para nombre
     * 
     * eliminar posible espacios al incio y al final del string
     * solo admiten carecteres alfabeticos y espacios
     */
    if (!req.body.nombre) {
        next();
    } else {
        let nombre = req.body.nombre;
        nombre = nombre.replace(/^[\s]+|[\s]+$/igm, '')
        if (!soloContieneLetrasEspacios(nombre)) {
            res.status(300);
            res.json({ severity: 'info', summary: '', detail: 'El nombre solo debe contener letras y espacios' });
        } else {
            next();
        }
    }
}

module.exports = validateNombre;