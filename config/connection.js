//this should go to the .env file and grab DB_NAME, DB_USER and DB_PASSWORD
require("dotenv").config();

//bringing in the sequelize package, making a class, Sequelize
const Sequelize = require("sequelize");
dotenv.config();
//this is how we did it in class in activity 01
//using sequelize to manage our connction
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	// "ecommerce_db",
	// "root",
	// "",
	{
		host: "localhost",
		dialect: "mysql",
		port: 3306, //the database connection port
	}
);
module.exports = sequelize;

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
