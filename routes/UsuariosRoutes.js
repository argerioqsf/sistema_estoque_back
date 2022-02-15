const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

//cadastrar usuarios
router.post('/', usuarioController.cadastrar);

//listar usuarios
router.get('/', usuarioController.listar);

module.exports = router