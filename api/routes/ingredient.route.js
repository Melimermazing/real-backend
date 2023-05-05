const router = require('express').Router()
const {
    getAllIngredients,
    getOneIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientsByAllergen,
    createIngredientWithAllergen,
    updateIngredientWithAllergen,
    deleteIngredientWithAllergen,
    deleteAllIngredientsWithAllergen
} = require('../controllers/ingredient.controller')

const {
    checkAuth,
    checkAdmin
} = require('../middleware/auth')

router.get('/', checkAuth, getAllIngredients) //Usuario ve todos los Ingredientes
router.get('/allergen/:id', checkAuth, getIngredientsByAllergen) //Usuario ve Ingredientes con Alérgeno
router.get('/:id', checkAuth, getOneIngredient) //Usuario ve un Ingrediente
router.post('/', checkAuth, checkAdmin, createIngredient) //Admin crea un Ingrediente
router.post('/:id/allergen/:allergenId', checkAuth, checkAdmin, createIngredientWithAllergen) //Admin relaciona Ingrediente con Alérgeno
router.put('/:id/allergen/:allergenId', checkAuth, checkAdmin, updateIngredientWithAllergen) //Admin modifica Ingrediente con Alérgeno
router.put('/:id', checkAuth, checkAdmin, updateIngredient) //Admin actualiza Ingrediente
router.delete('/:id/allergen/:allergenId', checkAuth, checkAdmin, deleteIngredientWithAllergen) //Admin elimina Ingrediente con Alérgeno
router.delete('/allergen/:id', checkAuth, checkAdmin, deleteAllIngredientsWithAllergen) //Admin elimina todos los Ingrediente con un Alérgeno
router.delete('/:id', checkAuth, checkAdmin, deleteIngredient) //Admin elimina Ingrediente
module.exports = router