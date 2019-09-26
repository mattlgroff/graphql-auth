const { AuthenticationError, gql } = require('apollo-server-express');
const { authenticateGoogle } = require('../passport');
const jwt = require('jsonwebtoken');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    user: UserToken
  }

  type UserToken {
    name: String
    email: String
  }

  type AuthResponse {
    token: String
    name: String
  }

  input AuthInput {
    accessToken: String!
  }

  type Mutation {
    authGoogle(input: AuthInput!): AuthResponse
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (parent, args, { user }) => {
      const { name, email } = user;

      return {
        name,
        email,
      };
    },
    hello: () => 'hello',
  },
  Mutation: {
    authGoogle: async (parent, { input }, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: input.accessToken,
      };

      try {
        const user = {
          name: 'Matthew Groff',
          email: 'mattlgroff@gmail.com',
        };

        return {
          name: user.name,
          token: jwt.sign(user, process.env.JWT_SECRET),
        };
        // data contains the accessToken, refreshToken and profile from passport
        // const { data, info } = await authenticateGoogle(req, res);

        // if (data) {
        // const user = {
        //   name: 'Matthew Groff',
        //   email: 'mattlgroff@gmail.com',
        // };

        //   if (user) {
        //     return {
        //       name: user.name,
        //       token: jwt.sign(user, process.env.JWT_SECRET),
        //     };
        //   }
        // }

        // if (info) {
        //   console.log(info);
        //   switch (info.code) {
        //     case 'ETIMEDOUT':
        //       return new Error('Failed to reach Google: Try Again');
        //     default:
        //       return new Error('something went wrong');
        //   }
        // }
        // return Error('server error');
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
