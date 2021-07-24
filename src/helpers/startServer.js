const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const startServer = async (schema) => {
  const apolloServer = new ApolloServer({
    schema,
  });

  //express server
  const app = express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
  });
};

module.exports = {
  startServer,
};
