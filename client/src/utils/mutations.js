import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
      mutation loginUser($email: String!, $password: String!) {
            loginUser($email: email, $password: password) {
                  token
                  user {
                        _id
                        username
                  }
            }
      }
`;

export const ADD_USER = gql`
      mutation addUser($username: String!, $email: String!, $password: String!) {
            addUser(username: $username, email: $email, password: $password) {
                  token
                  user {
                        _id
                        username
                  }
            }
      }
`;
// not sure if this is right?
export const SAVE_BOOK = gql`
      mutation saveBook($bookData: BookInput) {
            saveBook($bookData: bookData) {
                  user {
                        savedBooks
                  }
            }
      }
`;

export const REMOVE_BOOK = gql`
      mutation removeBook(bookId: String!) {
            removeBook($bookId: bookId) {
                  _id
                  username
                  email
                  savedBooks {
                        _id
                        bookId
                        authors
                        image
                        link
                        title
                        description
                  }
            }
      }
`;