const Express  = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const schema = require('./schema')
const app = Express();  
const session = require('express-session')
const typeDefs = require('./graphQL/typeDef');
const resolvers = require('./graphQL/resolvers');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { verify } =  require("jsonwebtoken");
const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
  });


  const app = Express();

  app.use(cookieParser());

  app.use((req, res, next) => {
    const accessToken = req.cookies["valid-token"];

    // Skip direct if no access token is available
    if(!accessToken) {
      return next();
    }


    try {
      const data = verify(accessToken, 'privateKey')
      req.userId = data.userId;
      console.log('Inside Try',req.userId)
    } catch(error) { }

    next();
  });

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();

// const corsOptions = {
//   origin: 'http://localhost:4000',
//   credentials: true,
//   methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
//  };
// app.use(cors(corsOptions));

// app.use(cookieParser())
// app.use((req,res,next) => {
//   const validToken = req.cookies['valid-token']
//   console.log(validToken)
//   try {
//   const data = jwt.verify(validToken, 'privateKey')
//   console.log('print',data)
//   req.userid = data.id
//   }
//   catch(err) {
    
//   }
//   next()
// })
// const server = new ApolloServer({ typeDefs, resolvers, context: ({req,res}) => ({req,res}) });
// server.applyMiddleware({app})
// // app.use('/graphql',graphqlHTTP({
// //     schema: schema,
// //     graphiql: true
// // }))

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// )






