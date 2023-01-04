const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// GET All Products
router.get("/", async (req, res) => {
	// finds all products
	try {
		const productInfo = await Product.findAll({
			attributes: ["id", "product_name", "price", "stock", "category_id"],
			include: [
				{
					model: Category,
					attributes: ["id", "category_name"],
				},
				{
					model: Tag,
					attributes: ["id", "tag_name"],
				},
			],
		});
		res.status(200).json(productInfo);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET One Product
router.get("/:id", async (req, res) => {
	// finds a single product by its `id`
	//  includes its associated Category and Tag data
	try {
		const singleProduct = await Product.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ["id", "product_name", "price", "stock", "category_id"],
			include: [
				{
					model: Category,
					attributes: ["id", "category_name"],
				},
				{
					model: Tag,
					attributes: ["id", "tag_name"],
				},
			],
		});
		res.status(200).json(singleProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

//CREATE A NEW PRODUCT
//THIS IS THE JSON OBJECT TO PUT IN INSOMNIA
//  req.body should look like this...
// {
//   product_name: "Basketball",
//   price: 200.00,
//   stock: 3,
//   tagIds: [1, 2, 3, 4]
// }

// router.post("/", async (req, res) => {

// 	Product.create(req.body, {
// 		where: {
// 			id: req.params.id,
// 		},
// 	});
// .then((product) => {
// 	// if there's product tags, we need to create pairings to bulk create in the ProductTag model
// 	if (req.body.tagIds.length) {
// 		const productTagIdArr = req.body.tagIds.map((tag_id) => {
// 			return {
// 				product_id: product.id,
// 				tag_id,
// 			};
// 		});
// 		return ProductTag.bulkCreate(productTagIdArr);
// 	}
// 	// if no product tags, just respond
// 	res.status(200).json(product);
// })
// .then((productTagIds) => res.status(200).json(productTagIds))
// .catch((err) => {
// 	console.log(err);
// 	res.status(400).json(err);
// 	// });
// });

// update product
router.put("/:id", (req, res) => {
	// update product data
	Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			// find all associated tags from ProductTag
			return ProductTag.findAll({ where: { product_id: req.params.id } });
		})
		.then((productTags) => {
			// get list of current tag_ids
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			// create filtered list of new tag_ids
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						product_id: req.params.id,
						tag_id,
					};
				});
			// figure out which ones to remove
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			// run both actions
			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			]);
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err);
		});
});

// deletes one product by its `id` value
router.delete("/:id", async (req, res) => {
	try {
		const deleteMe = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!deleteMe) {
			res.status(404).json({ message: "No product found matching that ID!" });
			return;
		}

		res.status(200).json(deleteMe);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
