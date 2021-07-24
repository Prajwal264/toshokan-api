const User = require("../../models/User");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        const user = await User.create({
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        });
        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return {
          token,
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          message: "Authentication succesfull",
        };
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
        const token = jsonwebtoken.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
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
