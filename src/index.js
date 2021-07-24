require("dotenv").config();

const { startServer } = require("./helpers/startServer");
const schema = require("./graphql/schema");

startServer(schema);
