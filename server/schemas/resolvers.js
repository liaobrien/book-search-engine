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
            }
      },

}