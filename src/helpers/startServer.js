const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const { verifyToken } = require("./verifyToken");

const startServer = async (schema) => {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.get("Authorization") || "";
      return { user: verifyToken(token.replace("Bearer", "")) };
    },
    introspection: true,
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
