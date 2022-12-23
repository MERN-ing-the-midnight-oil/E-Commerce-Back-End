//bringing in the sequelize package, making a class, Sequelize
const Sequelize = require("sequelize");

//this should go to the .env file and grab DB_NAME, DB_USER and DB_PASSWORD
require("dotenv").config();

//problem solving an access denied error. this shows that the username and database are coming through fine.
//so why can't I run npm run seed?
console.log(process.env.DB_USER, process.env.DB_NAME);

//this is a ternary statement "?"" is an "if" and  ":" is an  "else"
const sequelize = process.env.JAWSDB_URL
	? new Sequelize(process.env.JAWSDB_URL)
	: new Sequelize(
			process.env.DB_NAME,
			process.env.DB_USER,
			process.env.DB_PASSWORD,
			{
				host: "127.0.0.1",
				dialect: "mysql",
				port: 3306,
				dialectOptions: {
					decimalNumbers: true,
				},
			}
	  );
module.exports = sequelize;
