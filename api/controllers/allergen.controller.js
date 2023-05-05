const Allergen = require('../models/allergen.model')
// const User = require('../models/user.model')

async function getAllAllergens(req, res) {
    try {
        const allergens = await Allergen.findAll()
        if (allergens) {
            return res.status(200).json(allergens)
        } else {
            return res.status(404).send('No allergens found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneAllergen(req, res) {
    try {
        const allergen = await Allergen.findByPk(req.params.id)
        if (allergen) {
            return res.status(200).json(allergen)
        } else {
            return res.status(404).send('Allergen not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createAllergen(req, res) {
    try {
        if (await Allergen.findOne({
            where: { name: req.body.name }
        })) {
            return res.status(500).send('Allergen already exist')
        }
        const allergen = await Allergen.create(req.body)
        return res.status(200).json({ message: 'Allergen created', allergen: allergen })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateAllergen(req, res) {
    try {
        const [updated] = await Allergen.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        console.log(updated)
        if (updated) {
            return res.status(200).json({ message: 'Allergen updated' })
        } else {
            return res.status(404).send('Allergen not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteAllergen(req, res) {
    try {
        const allergen = await Allergen.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (allergen) {
            return res.status(200).json('Allergen deleted')
        } else {
            return res.status(404).send('Allergen not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllAllergens,
    getOneAllergen,
    createAllergen,
    updateAllergen,
    deleteAllergen,
}