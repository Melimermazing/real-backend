const router = require('express').Router()
const {
    getAllRecipes,
    getOneRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesWithIngredient,// PROBAR
    addIngredientToRecipe,
    deleteIngredientFromRecipe,
    updateIngredientInRecipe,
    getIngredientsByRecipe,
    getOneRecipeByName,
    getAllRecipesByName
} = require('../controllers/recipe.controller')

const {
    checkAuth,
    checkAdmin
} = require('../middleware/auth')


router.get('/', checkAuth, getAllRecipes) //usuario obtiene todas las recetas
router.get('/:id/ingredient', checkAuth, getIngredientsByRecipe)
router.get('/ingredient/:id', checkAuth, getRecipesWithIngredient)//usuario obtiene recetas con ingrediente
router.get('/:id', checkAuth, getOneRecipe) //usuario obtiene una receta
router.post('/', checkAuth, checkAdmin, createRecipe) //admin añade una receta
router.post('/getOneRecipeByName/', checkAuth, getOneRecipeByName)
router.post('/getAllRecipesByName/', checkAuth, getAllRecipesByName)
router.post('/:id/ingredient/:ingredientId', checkAuth, checkAdmin, addIngredientToRecipe) //Admin añade Ingrediente con Receta
router.put('/:recipeId/ingredient/:ingredientId', checkAuth, checkAdmin, updateIngredientInRecipe)// admin modifica ingrediente de una receta
router.put('/:id', checkAuth,checkAdmin, updateRecipe) //admin modifica una receta
router.delete('/:recipeId/ingredient/:ingredientId', checkAuth, checkAdmin, deleteIngredientFromRecipe)// admin borra ingrediente de una receta
router.delete('/:id', checkAuth,checkAdmin, deleteRecipe) //admin elimina una receta

module.exports = router