const { ApolloServer, gql } = require('apollo-server-express');

module.exports = gql`
    
    type Message {
        message: String
    }

    type User {
        id: ID,
        name: String,
        email: String,
        password:String,
        createdAt: String,
        updatedAt: String
    }

    type Stock  {
        id: ID ,
        name: String,
        price: String,
        sku: String,
        createdAt: String,
        updatedAt: String
    }

    type Query {
        stock(id: ID!): Stock,
        stocks: [Stock],
        deleteStock(id: ID!): Message,
        me: User
    }

    type Mutation {
        register(name:String!,password:String!,email:String!): Message,
        login(email: String!,password:String!): User,
        createStock(id: ID! ,
        name: String!,
        price: String!,
        sku: String!): [Stock]
    }
`