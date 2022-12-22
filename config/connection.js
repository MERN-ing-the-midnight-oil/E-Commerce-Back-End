//this should go to the .env file and grab DB_NAME, DB_USER and DB_PASSWORD
require("dotenv").config();

const Sequelize = require("sequelize");

//this is how we did it in class in activity 01
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	}
);

//I don't exactly understand this starter code... im assuming it does the same thing

// const sequelize = process.env.JAWSDB_URL
// 	? new Sequelize(process.env.JAWSDB_URL)
// 	: new Sequelize(
// 			process.env.DB_NAME,
// 			process.env.DB_USER,
// 			process.env.DB_PASSWORD,
// 			{
// 				host: "localhost",
// 				dialect: "mysql",
// 				dialectOptions: {
// 					decimalNumbers: true,
// 				},
// 			}
// 	  );

module.exports = sequelize;
