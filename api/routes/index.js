const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/user', require('./user.route'))
router.use('/recipe', require('./recipe.route'))
router.use('/ingredient', require('./ingredient.route'))
router.use('/allergen', require('./allergen.route'))

module.exports = router