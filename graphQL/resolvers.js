
const createWriteStream  = require('fs').createWriteStream 
const { ApolloServer, gql,ApolloError,AuthenticationError } = require('apollo-server-express');
const fs = require('fs')
const Users = require('../models').users;
const Rewards = require('../models').rewards;
const Family = require('../models').family_relations
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { GraphQLUpload } = require('graphql-upload')
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIAI7BMQW7SQRCNW7ZQ',
  secretAccessKey: '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'
});

const resolvers = {
    Query: {
        // stock: (parent,args,context,info) => {
        //    return model.stocks.findByPk(args.id)
        // },
        // stocks: () => Users.stocks.findAll(),
        // deleteStock: async (parent,args,context,info) => {
        //     const response = await model.stocks.findByPk(args.id)
        //     .then((stock) => {
        //         stock.destroy()
        //         return 'Deleted Successfully'
        //     })
        //     return response
        // },
        me:  async (parent,args,{req,res}) => {
            if(!req.userId) {
                console.log('Inside me',req.userID)
                return null
            } 
            const response = await Users.findOne({
                include: [Rewards],
                // attributes: {include: [Rewards]},
                where: {id:5},
            })
            console.log('Inside Me',response.dataValues)
            return {response}
        }

    },
    Mutation: {
        register: async (_,{name,password,email,family_relation_id,mobile_number}) => {
            let obj = {
                message: "User Created Successfully"
            }
            let hashPassword = await bcrypt.hash(password, saltRounds).then(function(hash) {
                return hash
            })
            // fs.readFile('demo.jpg', function (err, data) {
            //     if (err) { throw err; }
              
              
              
            //        params = {Bucket: myBucket, Key: myKey, Body: data };
              
            //        s3.putObject(params, function(err, data) {
              
            //            if (err) {
              
            //                console.log(err)
              
            //            } else {
              
            //                console.log("Successfully uploaded data to myBucket/myKey");
              
            //            }
              
            //         });
              
            //   });

            const create = await Users.create({
                name,
                email,
                password: hashPassword,
                family_relation_id,
                mobile_number
            }).then( async (results) => {
                return { message:'User created Successfully'}
            })
            .catch((error) => {
                console.log(error)
                throw new ApolloError('Failed to register please try again', '400',error);
            })
            return { message:'User created Successfully'}
        },
        login: async (parent,{email,password},{req,res},info) => {
            const obj = {
                message: 'Password is incorrect'
            }
            const user = await Users.findOne({where: {email}})
            .then((value) => {
                return value
            })
            if(!user) {
              throw new ApolloError('No user found !, please try again', '400');
            }
            const valid = await bcrypt.compare(password, user.password).then(function(result) {
                return result
            })
            if(!valid) {
                return obj
            }
            const validToken = jwt.sign({ userId: user.id }, 'privateKey',{ expiresIn: '300s' }, { algorithm: 'RS256' })
            res.userId = validToken
            user.token = validToken
            return user 
        },
        // createStock: async (parent,args,context,info) => {
        //     const response = await model.stocks.create(args)
        //     .then((stocks) => {
        //         return model.stocks.findAll()
        //     })
        //     return response
        // },
        createReward: async (parent,{name,amount,message,user_id,reward_id},{req,res},info) => {
            console.log('out',req)
            if(!req.userId) {
                console.log('Innnn')
                throw new AuthenticationError('auth_error','503',)
            }
            const reward = await Rewards.create({
                name,
                amount,
                message,
                user_id,
                reward_id
            })
            .then((reward) => {
                return reward
            })
            return reward
        },
        singleUpload: async(parent,{ file },context,info) => {
            console.log('File Via Playground',file)
            const { filename, mimetype, createReadStream } = await file
            console.log(mimetype)
            const fileStream = createReadStream()

            //Here stream it to S3
            // Enter your bucket name here next to "Bucket: "
            const uploadParams = {Bucket: 'mini-eli-bucket', Key: filename, Body: fileStream, ContentDisposition: 'inline', ContentType: mimetype };
            const result = await s3.upload(uploadParams).promise().catch((error) => {
               console.log(error)
            })


            

            return {filename}
            
        //     return new Promise(async (resolve, reject) =>
        //     createReadStream()
        //       .pipe(createWriteStream(__dirname + `/../images/${filename}`))
        //       .on("finish", () => resolve())
        //       .on("error", () => reject(false))
        //   );
          
        },
    }   
}
module.exports = resolvers


