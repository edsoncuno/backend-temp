const Herramienta = require('../models/Herramienta');
const controllerHerramienta = {};
controllerHerramienta.getHerramientas = async (req, res) => {
    const herramientas = await Herramienta.find();
    res.json(herramientas);
}
controllerHerramienta.getHerramienta = async (req, res) => {
    const herramienta = await Herramienta.findById({ _id: req.params.id });
    res.json(herramienta);
}
controllerHerramienta.postHerramienta = async (req, res) => {
    const newHerramienta = new Herramienta(req.body);
    await newHerramienta.save();
    res.json({status: "Herramienta creada"});
}
controllerHerramienta.putHerramienta = async (req, res) => {
    await Herramienta.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: "Herramienta editada"});
}
controllerHerramienta.deleteHerramienta = async (req, res) => {
    await Herramienta.findByIdAndDelete({ _id: req.params.id });
    res.json({status: "Herramienta eliminada"});
}
module.exports = controllerHerramienta;