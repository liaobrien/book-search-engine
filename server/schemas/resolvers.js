const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

// Define the query and mutation functionality to work with the Mongoose models.
// Hint: Use the functionality in the user - controller.js as a guide.

const resolvers = {
      Query: {
            users: async () => {
                  return User.find({}).populate('books');
            },
            user: async (parent, { username }) => {
                  return User.findOne({ username }).populate('books');
            },
            book: async () => {
                  return Book.findOne({});
            },
            books: async () => {
                  return Book.find({});
            },
            login: async (parent, { email, password }) => {

                  const user = await User.findOne({ email });

                  if (!user) {
                        throw new AuthenticationError('No user found with this email address');
                  }

                  const correctPw = await user.isCorrectPassword(password);

                  if (!correctPw) {
                        throw new AuthenticationError('Incorrect credentials');
                  }

                  const token = signToken(user);

                  return { token, user };
            },
      },

      Mutation: {
            createUser: async (parent, { username, email, password }) => {
                  // First we create the user
                  const user = await User.create({ username, email, password });
                  // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
                  const token = signToken(user);
                  // Return an `Auth` object that consists of the signed token and user's information
                  return { token, user };
            },

            saveBook: async (parent,) => {

            },
      }
}