## GraphQL Authentication Example

This example is not using Passport at the moment, but the skeleton is there if its wanted. This is a proof of concept to show an Authentication strategy for GraphQL.

This is intended to be used with Google Oauth but it could be used with any passport authentication.

### Using:

- Node
- Express
- Apollo Server Express
- Passport
- JsonWebToken

### Inspiration:

- https://medium.com/the-guild/authentication-and-authorization-in-graphql-and-how-graphql-modules-can-help-fadc1ee5b0c2
- https://reallifeprogramming.com/authentication-and-authorization-in-nodejs-graphql-api-58528f6fce5f

### Usage Example

#### Sending Google OAuth Token To Mutation

![alt text](https://i.imgur.com/15CPIsX.png)

```json
{
  "Authorization": "TOKEN_FROM_ABOVE_MUTATION"
}
```

#### After Authenticating (Authorization HTTP Header using Token From googleAuth mutation)

![alt text](https://i.imgur.com/Y4371RO.png)
