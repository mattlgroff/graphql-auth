const express = require('express');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

// Setup Express App
const app = express();

// Setup Passport
// TODO: Implement Passport Strategy for Google Oauth
app.use(passport.initialize());
app.use(passport.session());

// Setup ApolloServer
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});
apollo.applyMiddleware({ app });

const port = 4000;

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
  )
);
