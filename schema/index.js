const { AuthenticationError, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    user: String
  }
`;

// Resolver Authentication
const requiresLogin = resolver => (parent, args, context, info) => {
  if (context.user) {
    return resolver(parent, args, context, info);
  } else {
    throw new AuthenticationError('Unauthorized');
  }
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: requiresLogin((parent, args, { user }) => user),
    hello: () => 'hello',
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
