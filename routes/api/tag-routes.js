const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags// be sure to include its associated Product data
router.get("/", async (req, res) => {
	try {
		const allTags = await Tag.findAll({
			include: [
				{
					model: Product,
				},
			],
		});
		res.status(200).json(allTags);
	} catch (err) {
		res.status(500).json(err);
	}
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
	try {
		const singleTag = await Tag.findByPk(req.params.id, {
			include: [
				{
					model: Product,
				},
			],
		});
		res.status(200).json(singleTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new tag
	//localhost:3001/api/tags/
	try {
		const newTag = await Tag.create(req.body);
		res.status(201).json(newTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

// updates a tag's name by its `id` value
router.put("/:id", async (req, res) => {
	try {
		const updatedTag = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!updatedTag[0]) {
			res.status(404).json({ message: "There is no tag with that id." });
			return;
		}
		res.status(200).json(updatedTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
