const router = require('express').Router()
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser, 
    getMe,
    updateMe,
    deleteMe,
    insertRecipe,
    getMenuPlanner,
    updateMenuPlanner,
    getAllergensByUser,
    addAllergenToUser,
    updateAllergenFromUser,
    deleteRecipeMenuPlanner,
    deleteAllRecipesMenuPlanner,
    deleteAllergenFromUser,
} = require('../controllers/user.controller')

const {
    checkAuth,
    checkAdmin
} = require('../middleware/auth')

const {
    login,
    signUp
} = require('../controllers/auth.controller')

const {
    randomRecipe
} = require ('../controllers/recipe.controller')

const {
    insertAllergen
} = require('../controllers/allergen.controller')

router.get('/', checkAuth, checkAdmin, getAllUsers) //Admin ve todos los usuarios
router.get('/me/menuPlanner', checkAuth, getMenuPlanner) //Usuario ve su MenuPlanner
router.get('/me/allergen', checkAuth, getAllergensByUser) //Usuario ve sus alérgenos
router.get('/me', checkAuth, getMe) //Usuario ve su perfil
router.get('/:id', checkAuth, checkAdmin, getOneUser) //Admin ve un usuario
router.post('/', checkAuth, checkAdmin, createUser) //Admin registra un usuario
router.post('/me/allergen/:id', checkAuth, addAllergenToUser) //Usuario añade un alérgeno a su perfil
router.post('/signUp', signUp) //Usuario se registra
router.post('/login', login) //Usuario hace login
router.post('/me/menuPlanner/addRandom', checkAuth, randomRecipe) //Usuario añade una receta random al MenuPlanner
router.post('/me/menuPlanner/:id', checkAuth, insertRecipe) //Usuario añade una receta al MenuPlanner
router.put('/me/allergen/id', checkAuth, updateAllergenFromUser)
router.put('/me/menuPlanner/:id', checkAuth, updateMenuPlanner)// Usuario modifica una receta del MenuPlanner
router.put('/me', checkAuth, updateMe) //Usuario modifica su perfil
router.put('/:id', checkAuth, checkAdmin, updateUser) //Admin modifica un usuario
router.delete('/me/allergen/id', checkAuth, deleteAllergenFromUser) //Usuario elimina un alérgeno de su perfil
router.delete('/me/menuPlanner/all', checkAuth, deleteAllRecipesMenuPlanner)
router.delete('/me/menuPlanner/:id', checkAuth, deleteRecipeMenuPlanner) //Usuario elimina un MenuPlanner de su perfil
router.delete('/me', checkAuth, deleteMe) //Usuario elimina su perfil
router.delete('/:id', checkAuth, checkAdmin, deleteUser) //Admin elimina un usuario


module.exports = router