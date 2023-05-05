const Ingredient = require('../models/ingredient.model')
const Allergen = require('../models/allergen.model')

async function getAllIngredients(req, res) {
    try {
        const ingredient = await Ingredient.findAll()
        if (ingredient) {
            return res.status(200).json(ingredient)
        } else {
            return res.status(404).send('No Ingredients found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneIngredient(req, res) {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id)
        if (ingredient) {
            return res.status(200).json(ingredient)
        } else {
            return res.status(404).send('Ingredient not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createIngredient(req, res) {
    try {
        if (await Ingredient.findOne({
            where: { name: req.body.name }
        })) {
            return res.status(404).send('Ingredient already exist')
        }
        await Ingredient.create(req.body)
        return res.status(200).json('Ingredient created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createIngredientWithAllergen(req, res) {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id)
        const allergen = await Allergen.findByPk(req.params.allergenId)
        if (ingredient && allergen) {
            await ingredient.addAllergen(allergen)
            return res.status(200).json('Ingredient with Allergen added')
        } else {
            return res.status(404).send('Allergen or Ingredient not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateIngredient(req, res) {
    try {
        const [updated] = await Ingredient.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        console.log(updated)
        if (updated) {
            return res.status(200).json({ message: 'Ingredient updated' })
        } else {
            return res.status(404).send('Ingredient not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteIngredient(req, res) {
    try {
        const ingredient = await Ingredient.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (ingredient) {
            return res.status(200).json('Ingredient deleted')
        } else {
            return res.status(404).send('Ingredient not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getIngredientsByAllergen(req, res) {
    try {
        const allergen = await Allergen.findByPk(req.params.id);
        if (!allergen) {
            return res.status(404).send(`Allergen with id ${req.params.id} not found`);
        }
        const ingredients = await allergen.getIngredients();
        if (ingredients.length > 0) {
            return res.status(200).json(ingredients);
        } else {
            return res.status(404).send(`No Ingredients found for Allergen with id: '${req.params.id}'`);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateIngredientWithAllergen(req, res) {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);
        if (!ingredient) {
            return res.status(404).send(`Ingredient with id: '${req.params.id}' not found`);
        }
        const allergen = await Allergen.findByPk(req.params.allergenId);
        if (!allergen) {
            return res.status(404).send(`Allergen with id: '${req.params.allergenId}' not found`);
        }
        const newAllergen = await Allergen.findByPk(req.body.allergenId);
        if (!newAllergen) {
            return res.status(404).send(`New Allergen with id: '${req.body.allergenId}' not found`);
        }
        await ingredient.removeAllergen(allergen);
        await ingredient.addAllergen(newAllergen)
        return res.status(200).json('Allergen with new Ingredient modified');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteIngredientWithAllergen(req, res) {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);
        if (!ingredient) {
            return res.status(404).send('Ingredient not found');
        }
        const allergen = await Allergen.findByPk(req.params.allergenId);
        if (!allergen) {
            return res.status(404).send('Allergen not found');
        }
        await ingredient.removeAllergen(allergen);
        return res.status(200).json('Allergen removed from Ingredient');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteAllIngredientsWithAllergen(req, res) {
    try {
        const allergen = await Allergen.findByPk(req.params.id);
        if (!allergen) {
            return res.status(404).send('Allergen not found');
        }
        const ingredients = await allergen.getIngredients();
        if (ingredients.length > 0) {
            ingredients.forEach(i => {
                i.removeAllergen(allergen)
            });
            return res.status(200).send(`Ingredients with Allergen removed successfully`);
        } else {
            return res.status(404).send(`No Ingredients found for Allergen with id: '${req.params.id}'`);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
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
}