const router = require("express").Router();
const { Category, Product } = require("../../models");

// finds all categories
router.get("/", async (req, res) => {
	try {
		const categoryData = await Category.findAll();
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Finds a single category by its PK, includes all associated Products
router.get("/:id", async (req, res) => {
	try {
		const singleCategory = await Category.findByPk(req.params.id, {
			include: [Product], //this simpler syntax seems to work
		});
		res.status(200).json(singleCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// create a new category
router.post("/", async (req, res) => {
	try {
		const newCategory = await Category.create(req.body);
		res.status(200).json(newCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
	try {
		const updatedCategory = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!updatedCategory[0]) {
			res.status(404).json({ message: "There is no category with that id." });
			return;
		}
		res.status(200).json(updatedCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const deleteMe = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!deleteMe) {
			res.status(404).json({ message: "No Category was found with that ID!" });
			return;
		}
		res.status(200).json(deleteMe);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
