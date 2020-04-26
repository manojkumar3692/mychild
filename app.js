const Express  = require('express');
const { ApolloServer, gql,ApolloError } = require('apollo-server-express');
const session = require('express-session')
const typeDefs = require('./graphQL/typeDef');
const resolvers = require('./graphQL/resolvers');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { verify } =  require("jsonwebtoken");
const { graphqlUploadExpress } = require('graphql-upload')
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const startServer = async () => {
  const server = new ApolloServer({
    introspection: true,
    playground: true,
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    ApolloError
  });

 const app = Express();

  // app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  app.use(cookieParser());

  app.use( (req, res, next) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    console.log('First', token)
    // Skip direct if no access token is available
    // if(!token) {
    //   console.log('In',token)
    //   return next();
    // }
    try {
      console.log('check token',token)
        const data =  jwt.verify(token, 'privateKey')
        req.userId = data.userId;
        console.log('Inside try block')
      // return null
    } catch (err) {
      // return null
      console.log('Inside Catch block')
    }
    // try {
    //   const data = verify(token, 'privateKey')
    //   req.userId = data.userId;
    // } catch(error) {
    // }
    next()
  });
  const path = '/graphql';  
  server.applyMiddleware({ app,path, }); // app is from an existing express app

  app.listen({ port: PORT }, () =>
    // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    console.log('asdsadas',PORT)
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






