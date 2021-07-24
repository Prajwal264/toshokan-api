const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("../helpers/mergeTypes");
const resolvers = require("../helpers/mergeResolvers");

console.log(resolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
