
const createWriteStream  = require('fs').createWriteStream 
const fs = require('fs')
const Users = require('../models').users;
const Rewards = require('../models').rewards;
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
            console.log('hash',hashPassword)
            const create = await Users.create({
                name,
                email,
                password: hashPassword,
                family_relation_id,
                mobile_number
            }).then(() => {
                return obj
            })
            .catch((error) => {
                return error
            })
            return create
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
                return null
            }
            const valid = await bcrypt.compare(password, user.password).then(function(result) {
                return result
            })
            if(!valid) {
                return obj
            }
            const validToken = jwt.sign({ userId: user.id }, 'privateKey',{ expiresIn: '300s' }, { algorithm: 'RS256' })
            res.cookie('valid-token',validToken)
            user.token = validToken
            console.log(res)
            return user 
        },
        // createStock: async (parent,args,context,info) => {
        //     const response = await model.stocks.create(args)
        //     .then((stocks) => {
        //         return model.stocks.findAll()
        //     })
        //     return response
        // },
        createReward: async (parent,{name,amount,message,user_id},context,info) => {
            await Rewards.create({
                name,
                amount,
                message,
                user_id
            })
            .then((reward) => {
                return {name,amount,message,user_id}
            })
        },
        singleUpload: async(parent,{ file },context,info) => {
            const { filename, mimetype, createReadStream } = await file
            console.log(mimetype)
            const fileStream = createReadStream()

            //Here stream it to S3
            // Enter your bucket name here next to "Bucket: "
            const uploadParams = {Bucket: 'mini-eli-bucket', Key: filename, Body: fileStream, ContentDisposition: 'inline', ContentType: mimetype };
            const result = await s3.upload(uploadParams).promise().catch((error) => {
               console.log(error)
            })

      
            console.log('results',result)
            console.log(typeof result)
            

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


