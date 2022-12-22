//this ssets up the server that listens for user requests (or requests from insomnia, probably)

const express = require("express");
const routes = require("./routes");

// import sequelize connection //AKA the connection object
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
//in other words connect to the database before starting the express.js server
sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
//I should now have a web server that is listening, so time to install a database!
