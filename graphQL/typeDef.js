const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload')
module.exports = gql`
    
    type Message {
        message: String
    }

    type User {
        id: ID,
        name: String,
        email: String,
        password:String,
        family_relation_id:ID,
        mobile_number:String
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

    type Reward {
        id: ID,
        name:String,
        amount:String,
        message: String,
        user_id: ID
    }

    type File {
        filename: String
        mimetype: String
        encoding: String
    }

    type Query {
        # stock(id: ID!): Stock,
        # stocks: [User],
        # deleteStock(id: ID!): Message,
        me: User
    }

    type Mutation {
        register(name:String!,password:String!,email:String!,mobile_number:String!,family_relation_id:ID!): Message,
        login(email: String!,password:String!): User,
        createStock(id: ID!,name: String!, price: String!,sku: String!): [Stock],
        createReward(amount: String!,message: String!,user_id: ID): Reward,
        singleUpload(file:Upload!): File,
    }
`

