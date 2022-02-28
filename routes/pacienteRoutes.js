import express from 'express';
const router = express.Router();
import { 
    agregarPaciente, 
    obtenerPacientes,
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente 
} from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js'

router
    .route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes) // Se agrega el checkout para proteger el endpoint de agregarPaciente

router
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router; 