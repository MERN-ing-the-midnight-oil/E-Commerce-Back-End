// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

//CHECK OUT ACTIVITY 23 THIS IS ABOUT ESTABLISHING THE RELATIONSHIPS BETWEEN TABLES , WATCH DAY 3 OF CLASS

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};
