import Paciente from '../models/Paciente.js';

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body) // Automaticamente genera un id.
    paciente.veterinario = req.veterinario._id
    
    try { // Se agrega a la base de datos
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
    .where('veterinario') // Indica la columna 
    .equals(req.veterinario) // Utilizando la variable del servidor

    res.json(pacientes)
};

const obtenerPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no válida"})
    }

    res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no válida"})
    }

    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre // Si no esta disponible en el request que estamos enviando (req.body postman), colocara lo que ya está en la base de datos (paciente.nombre).
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
};

const eliminarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: "Accion no válida"})
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "Paciente Eliminado"})
    } catch (error) {
        console.log(error)
    }
};

export { 
    agregarPaciente,
    obtenerPacientes, 
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente
};