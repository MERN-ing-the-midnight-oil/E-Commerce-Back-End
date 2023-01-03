// import models //this file is about establishing relationships between models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// establish that Product belongsTo Category
Product.belongsTo(Category, {
	foreingKey: "category_id",
});

// establish that a Category has many Product
Category.hasMany(Product, {
	foreignKey: "category_id", //category_id is a column in Product
	onDelete: "CASCADE", //probably this deletes a category_id (in Product) when the id it references is deleted, I'm guessing.
});

// establish that a product can be reffered to by many Product Tags, i.e. Product belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
	through: {
		model: ProductTag,
		unique: false, //prevents the automatic creation of a unique through key
	},
});

// establish that a tag can be reffred to by many products, i.e. Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
	through: {
		model: ProductTag,
	},
});

module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};
