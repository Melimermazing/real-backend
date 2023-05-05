const User = require('../api/models/user.model')
const Allergen = require('../api/models/allergen.model')
const Ingredient = require('../api/models/ingredient.model')
const Recipe_Ingredient = require('../api/models/recipe_ingredient.model') 
const Recipe = require('../api/models/recipe.model')
const Menu_Planner = require('../api/models/menu_planner.model')

function addRelations() {
    try {
        User.belongsToMany(Allergen, { through: 'User_Allergen' })
        Allergen.belongsToMany(User, { through: 'User_Allergen' })

        Allergen.belongsToMany(Ingredient, { through: 'Ingredient_Allergen' })
        Ingredient.belongsToMany(Allergen, { through: 'Ingredient_Allergen' })

        Recipe.belongsToMany(User, { through: Menu_Planner });
        User.belongsToMany(Recipe, { through: Menu_Planner });

        Recipe.belongsToMany(Ingredient, { through: Recipe_Ingredient });
        Ingredient.belongsToMany(Recipe, { through: Recipe_Ingredient });

        console.log('Relations added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelations