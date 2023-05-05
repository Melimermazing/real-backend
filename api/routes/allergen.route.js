const router = require('express').Router()
const {
    getAllAllergens,
    getOneAllergen,
    createAllergen,
    updateAllergen,
    deleteAllergen, 
} = require('../controllers/allergen.controller')

const {
    checkAuth,
    checkAdmin
} = require('../middleware/auth')


router.get('/', checkAuth, getAllAllergens) //Usuario obtiene todos los Alérgenos
router.get('/:id', checkAuth, getOneAllergen)// Usuario obtiene un Alérgeno
router.post('/', checkAuth, checkAdmin, createAllergen)// Admin crea un Alérgeno
router.put('/:id', checkAuth, checkAdmin, updateAllergen)// Admin actualiza un Alérgeno
router.delete('/:id', checkAuth, checkAdmin, deleteAllergen)// Admin elimina un Alérgeno

module.exports = router