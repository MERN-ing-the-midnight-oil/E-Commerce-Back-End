// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
	{
		//defining sequelize product model column: ID
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		//defining sequelize product model column: NAME
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		//defining sequelize product model column: PRICE
		price: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			validate: {
				isDecimal: true, //validate that value is a decimal
			},
		},
		//defining sequelize product model column: STOCK
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true, //validate that value is
			},
			defaultValue: 10,
		},
		//defining sequelize product model column: category_id
		category_id: {
			type: DataTypes.INTEGER,
			//References the Category model's id.
			references: {
				model: "category", //should "category" be capitalized? I'm thinking no based on modelName: category from line 28 of Category.js
				key: "id",
			},
		},
	},

	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product",
	}
);

module.exports = Product;
