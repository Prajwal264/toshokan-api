const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/token");

module.exports = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    register: async (_, { username, email, password, role }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Account Already Exists");
        } else {
          const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role,
            createdAt: new Date().toISOString(),
          });
          const token = createToken(user, "1y");
          return {
            token,
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            message: "Authentication succesfull",
            createdAt: user.createdAt,
          };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user with that email");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        delete user.password;
        const token = createToken(user, "1d");
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
