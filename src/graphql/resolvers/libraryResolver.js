module.exports = {
  Query: {},
  Mutation: {
    createLibrary: (_, { identifier, name, bio, image, adminId }, ctx) => {
      try {
        const existingLibrary = await Library.findOne({ identifier });
        if (existingLibrary) {
          throw new Error("Library Identifier already exisits");
        } else {
          // you were here
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
