const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Recipe = require('../models/recipe.model')
const Menu_Planners = require('../models/menu_planner.model')
const Allergen = require('../models/allergen.model')

async function getAllUsers(req, res) {
    try {
        const users = await User.findAll()
        if (users) {
            return res.status(200).json(users)
        } else {
            return res.status(404).send('No users found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body)
        return res.status(200).json({ message: 'User created', user: user })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const [updated] = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        console.log(updated)
        if (updated) {
            return res.status(200).json({ message: 'User updated' })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (user) {
            return res.status(200).json('User deleted')
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function insertRecipe(req, res) {
    try {
        const recipe = await Recipe.findByPk(req.params.id)
        if (recipe) {
            const user = await User.findByPk(res.locals.user.id)
            const found = await user.getRecipes()

            let exist = false
            for (let i of found) {
                if (JSON.stringify(i.id) === req.params.id) {
                    exist = true
                    break
                }
            }
            if (!exist) {
                user.addRecipes(req.params.id)
                return res.status(200).json({ message: 'Recipe added' })
            } else {
                return res.status(404).send('Recipe alredy exist')
            }
        } else {
            return res.status(404).send('Recipe no exist')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getMe(req, res) {
    try {
        const user = await User.findOne({
            where: {
                id: res.locals.user.id
            }
        })
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateMe(req, res) {
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const [updated] = await User.update(req.body, {
            where: {
                id: res.locals.user.id,
            },
        })
        console.log(updated)
        if (updated) {
            return res.status(200).json({ message: 'User updated' })
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteMe(req, res) {
    try {
        const user = await User.destroy({
            where: {
                id: res.locals.user.id,
            },
        })
        if (user) {
            return res.status(200).json('User deleted')
        } else {
            return res.status(404).send('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getMenuPlanner(req, res) {
    try {
        const userMenuPlanner = await res.locals.user.getRecipes()
        if (userMenuPlanner) {
            return res.status(200).json(userMenuPlanner)
        } else {
            return res.status(404).send(`Menu Planner of user: '${res.locals.user.username}' not found`)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateMenuPlanner(req, res) {// PROBAR
    try {
        const updated = await res.locals.user.getRecipes.update(
            {
                recipeId: req.body.recipeId
            },
            {
                where: {
                    userId: res.locals.user.id,
                    recipeId: req.params.id
                }
            }
        );
        if (updated) {
            return res.status(200).json({ message: 'Recipe updated in menu planner' });
        } else {
            return res.status(404).send('Recipe not found in menu planner');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getAllergensByUser(req, res) {
    try {
        const userAllergens = await res.locals.user.getAllergens()
        if (userAllergens) {
            return res.status(200).json(userAllergens)
        } else {
            return res.status(404).send(`Allergens of user: '${res.locals.user.username}' not found`)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteRecipeMenuPlanner(req, res) {
    try {
        // const recipe = Menu_Planners.findOne(req.params.id)
        // if ()
        const deleted = await Menu_Planners.destroy({
            where: {
                userId: res.locals.user.id,
                recipeId: req.params.id
            }
        });
        if (deleted) {
            return res.status(200).json({ message: 'Recipe deleted from menu planner' });
        } else {
            return res.status(404).send('Recipe not found in menu planner');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteAllRecipesMenuPlanner(req, res) {
    try {
        const deleted = await Menu_Planners.destroy({
            where: {
                userId: res.locals.user.id
            },
        });
        if (deleted) {
            return res.status(200).json('All Recipes deleted from MenuPlanner');
        } else {
            return res.status(404).send('No Recipes found in MenuPlanner');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// async function addAllergenToUser(req, res) {
//     try {
//         // const user = await User.findByPk(res.locals.user.id);
//         const allergen = await Allergen.findByPk(req.params.allergenId);
//         if (allergen) {
//             await res.locals.user.id.addAllergen(allergen);
//             return res.status(200).json({ message: 'Allergen added to User' });
//         } else {
//             return res.status(404).send('User or Allergen not found');
//         }
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

async function getAllergensByUser(req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id);
        if (user) {
            const allergens = await user.getAllergens();
            return res.status(200).json(allergens);
        } else {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function addAllergenToUser(req, res) {// PROBAR
    try {
        const allergen = await Allergen.findByPk(req.params.id)
        if (allergen) {
            const userAllergens = await res.locals.user.getAllergens()

            let exist = false
            for (let i of userAllergens) {
                if (JSON.stringify(i.id) === req.params.id) {
                    exist = true
                    break
                }
            }
            if (!exist) {
                res.locals.user.addAllergens(req.params.id)
                return res.status(200).json({ message: `Allergen asociated to user: '${res.locals.user.username}'` })
            } else {
                return res.status(404).send('Allergen alredy exist')
            }
        } else {
            return res.status(404).send('Allergen no exist')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateAllergenFromUser(req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id);
        const allergen = await Allergen.findByPk(req.params.id);
        const newAllergen = await Allergen.findByPk(req.body.allergenId);
        if (user && allergen && newAllergen) {
            await user.removeAllergen(allergen);
            await user.addAllergen(newAllergen);
            return res.status(200).json({ message: 'Allergen updated for user' });
        } else {
            return res.status(404).send('User or allergen not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteAllergenFromUser(req, res) {
    try {
        // const user = await User.findByPk(res.locals.user.id);
        const allergen = await Allergen.findByPk(req.params.id);
        if (allergen) {
            await res.locals.user.id.removeAllergen(allergen);
            return res.status(200).json({ message: 'Allergen removed from User' });
        } else {
            return res.status(404).send('User or Allergen not found');
        }
        // const userAllergen = await res.locals.user.removeAllergen({
        //     where: {
        //         [Op.and]: [
        //             { userId: res.locals.user.id },
        //             { allergenId: req.params.id }
        //         ]
        //         // userId: res.locals.user.id
        //         // allergenId: req.params.id,
        //     },
        // })
        // if (userAllergen) {
        //     return res.status(200).json(`Allergen of user: '${res.locals.user}' deleted`)
        // } else {
        //     return res.status(404).send('User or Allergen not found')
        // }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getMe,
    updateMe,
    deleteMe,
    getMenuPlanner,
    insertRecipe,
    updateMenuPlanner,
    deleteRecipeMenuPlanner,
    deleteAllRecipesMenuPlanner,
    getAllergensByUser,
    addAllergenToUser,
    updateAllergenFromUser,
    deleteAllergenFromUser,
}