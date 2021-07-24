const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const startServer = async (schema) => {
  const apolloServer = new ApolloServer({
    schema,
  });

  //express server
  const app = express();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
  });
};

module.exports = {
  startServer,
};
