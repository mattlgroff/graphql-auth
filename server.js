require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const jwt = require('jsonwebtoken');

// Setup Express App
const app = express();

// Setup ApolloServer
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: context => {
    const token = context.req.headers.authorization || '';
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // Don't Authentication authGoogle Mutation Used For Getting Token
      const isWhitelisted = context.req.body.query.includes('authGoogle');

      if (err && !isWhitelisted) {
        throw new AuthenticationError('Unauthorized');
      }
      return decoded;
    });

    return {
      ...context,
      user,
    };
  },
});
apollo.applyMiddleware({ app });

const port = 4000;

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
  )
);
