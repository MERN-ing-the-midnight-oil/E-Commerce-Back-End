const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	// finds all categories
		try {
		const categoryData = await Category.findAll();
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});
// be sure to include its associated Products 

//Find a single category by its PK, include all associated Products
router.get("/:id", async (req, res) => {
	try {
		const singleCategory = await Category.findByPk(req.params.id,{
		//	include://[model:Product]
		})
	}
	// be sure to include its associated Products, Somehow???
});

// create a new category 
router.post("/", async (req, res) => {
	try{
		const newCategory = await Category.create(req.body);
		res.status(200).json(newCategory);
		} catch (err) {
			res.status(400).json(err);
		}
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const deleteMe = await Category.destroy({
			where: {
                id: req.params.id
            }
		});
		if (!deleteMe) {
			res.status(404).json({ message: 'No Category was found with that ID!'});
			return;
		}

		res.status(200).json(deleteMe);
		} catch (err) {
			res.status(500).json(err);
	}
});

module.exports = router;
