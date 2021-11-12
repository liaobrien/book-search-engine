const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// Define the query and mutation functionality to work with the Mongoose models.
// Hint: Use the functionality in the user - controller.js as a guide.

const resolvers = {
      Query: {
            me: async (parent, args, context) => {
                  if (context.user) {
                        const userData = await User.findOne({
                              id: context.user._id
                        })

                        return userData;
                  }
            }
      },

      Mutation: {
            addUser: async (parent, { username, email, password }) => {

                  const user = await User.create({ username, email, password });

                  const token = signToken(user);

                  return { token, user };
            },

            login: async (parent, { email, password }) => {
                  const user = await User.findOne({ email });

                  if (!user) {
                        throw new AuthenticationError("Not logged in.");
                  }

                  const correctPw = await user.isCorrectPassword(password);

                  if (!correctPw) {
                        throw new AuthenticationError("Incorrect password.");
                  }

                  const token = signToken(user);

                  return { token, user };
            },

            saveBook: async (parent, { bookData }, context) => {
                  if (context.user) {
                        const updatedUser = await User.findOneAndUpdate(
                              { _id: context.user._id },
                              { $push: { savedBooks: bookData } },
                              { new: true, runValidators: true }
                        );

                        return updatedUser;
                  }

                  throw new AuthenticationError("Not signed in!");

            },

            removeBook: async (parent, { bookId }, context) => {
                  if (context.user) {
                        const updatedUser = await User.findOneAndUpdate(
                              { _id: context.user._id },
                              { $pull: { savedBooks: { bookId } } },
                              { new: true }
                        );

                        return updatedUser;
                  }

                  throw new AuthenticationError("Not signed in!");
            }

      }
}

module.exports = resolvers;