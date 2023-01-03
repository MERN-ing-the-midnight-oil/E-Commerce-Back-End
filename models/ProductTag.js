const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
	{
		// define columns (attributes of a Product Tag)  id, product_id, and tag_id
		//product_id references the primary key from the product model, tag_id references the pK from the Tag model
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		product_id: {
			//PK from the product model
			type: DataTypes.INTEGER,
			references: {
				model: "Product",
				key: "id",
			},
		},
		tag_id: {
			//PK from the tag model
			type: DataTypes.INTEGER,
			references: {
				model: "Tag",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product_tag",
	}
);

module.exports = ProductTag;
