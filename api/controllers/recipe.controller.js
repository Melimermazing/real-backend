const Recipe = require('../models/recipe.model')
const Ingredient = require('../models/ingredient.model')
const Recipe_Ingredient = require('../models/recipe_ingredient.model')
const Menu_Planners = require('../models/menu_planner.model')

const { Op } = require('sequelize');

async function getAllRecipes(req, res) {
    try {
        const recipes = await Recipe.findAll()
        if (recipes) {
            return res.status(200).json(recipes)
        } else {
            return res.status(404).send('No Recipes found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneRecipe(req, res) {
    try {
        const recipe = await Recipe.findByPk(req.params.id)
        if (recipe) {
            return res.status(200).json(recipe)
        } else {
            return res.status(404).send('Recipe not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createRecipe(req, res) {
    try {
        if (await Recipe.findOne({
            where: { name: req.body.name }
        })) {
            return res.status(404).send('Recipe already exist')
        }
        await Recipe.create(req.body)
        return res.status(200).json('Recipe created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateRecipe(req, res) {
    try {
        const [updated] = await Recipe.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        console.log(updated)
        if (updated) {
            return res.status(200).json({ message: 'Recipe updated' })
        } else {
            return res.status(404).send('Recipe not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteRecipe(req, res) {
    try {
        const recipe = await Recipe.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (recipe) {
            return res.status(200).json('Recipe deleted')
        } else {
            return res.status(404).send('Recipe not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

function getUnassignedRecipes(userRecipes, recipes) {
    const result = recipes.filter(r =>
        !userRecipes.some(uR =>
            r.id === uR.id))
    return result
}

async function randomRecipe(req, res) {
    try {
        const recipes = await Recipe.findAll()
        const userRecipes = await res.locals.user.getRecipes()

        if (recipes.length - userRecipes.length > 0) {
            const newRecipes = getUnassignedRecipes(userRecipes, recipes)
            const randomRecipe = Math.floor(Math.random() * newRecipes.length);

            await Menu_Planners.create({
                userId: res.locals.user.id,
                recipeId: newRecipes[randomRecipe].id,
                date: req.body.date
            });
            res.locals.user.addRecipes(newRecipes[randomRecipe])
            return res.status(200).json(newRecipes[randomRecipe]);
        } else {
            return res.status(404).send('All Recipes alredy exist')
        }
    } catch(error) {
        return res.status(500).send(error.message)
    }
}

async function addIngredientToRecipe(req, res) {
 
    try {
        const recipe = await Recipe.findByPk(req.params.id)
        console.log(recipe)
        const ingredient = await Ingredient.findByPk(req.params.ingredientId)
        console.log(ingredient)
        if (recipe && ingredient) {
            await Recipe_Ingredient.create({ 
                recipeId: recipe.id, 
                ingredientId: ingredient.id, 
                quantity: req.body.quantity, 
                unit: req.body.unit 
              });
            return res.status(200).json('Recpe with Ingredient added')
        } else {
            return res.status(404).send('Recipe or Ingredient not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getIngredientsByRecipe(req, res) {
    try {
        const recipe = await Recipe.findByPk(req.params.id)
        if (!recipe) {
            return res.status(404).send('Recipe not found')
        }
        const ingredients = await recipe.getIngredients()
        return res.status(200).json(ingredients)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getRecipesWithIngredient(req, res) {// PROBAR
    try {
        const ingredient = await Recipe.findByPk(req.params.id)
        if (!ingredient) {
            return res.status(404).send('Ingredient not found')
        }
        const recipes = await ingredient.getRecipes()
        return res.status(200).json(recipes)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteIngredientFromRecipe(req, res) {
    try {
        const recipe = await Recipe.findByPk(req.params.recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        const ingredient = await Ingredient.findByPk(req.params.ingredientId);
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }
        const recipeIngredient = await Recipe_Ingredient.findOne({
            where: {
                recipeId: recipe.id,
                ingredientId: ingredient.id
            }
        });
        if (!recipeIngredient) {
            return res.status(404).send('Ingredient not found in Recipe');
        }
        await recipeIngredient.destroy();
        return res.status(200).json({ message: 'Ingredient deleted from Recipe' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function updateIngredientInRecipe(req, res) {
    try {
        const recipeIngredient = await Recipe_Ingredient.findOne({
            where: {
                recipeId: req.params.recipeId,
                ingredientId: req.params.ingredientId,
            },
        });
        if (!recipeIngredient) {
            return res.status(404).send('Ingredient not found in Recipe');
        }
        const updated = await Recipe_Ingredient.update(
            {
                ingredientId: req.body.ingredientId,
                quantity: req.body.quantity,
                unit: req.body.unit,
            },
            {
                where: {
                    recipeId: req.params.recipeId,
                    ingredientId: req.params.ingredientId,
                },
            }
        );
        if (updated) {
            return res.status(200).json({ message: 'Ingredient updated in Recipe' });
        } else {
            return res.status(404).send('Ingredient not found in Recipe');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getOneRecipeByName(req, res) {
    try {
        const recipe = await Recipe.findOne({
            where:  { name: { [Op.like]: `%${req.body.name}%` } },
        })
        if (recipe) {
            return res.status(200).json(recipe)
        } else {
            return res.status(404).send('Recipe not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    randomRecipe,
    getRecipesWithIngredient,
    addIngredientToRecipe,
    updateIngredientInRecipe,
    deleteIngredientFromRecipe,
    getIngredientsByRecipe,
    getOneRecipeByName,
}