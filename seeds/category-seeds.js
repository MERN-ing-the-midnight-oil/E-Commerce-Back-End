//pulls in the Category models
const { Category } = require("../models");

const categoryData = [
	{
		category_name: "Shirts",
	},
	{
		category_name: "Shorts",
	},
	{
		category_name: "Music",
	},
	{
		category_name: "Hats",
	},
	{
		category_name: "Shoes",
	},
];
//talk to sequelize, go to the Category table, and bulk create categiries
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
