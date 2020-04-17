
const Users = require('../models').users;
const Rewards = require('../models').rewards;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        // stock: (parent,args,context,info) => {
        //    return model.stocks.findByPk(args.id)
        // },
        // stocks: () => model.stocks.findAll(),
        // deleteStock: async (parent,args,context,info) => {
        //     const response = await model.stocks.findByPk(args.id)
        //     .then((stock) => {
        //         stock.destroy()
        //         return 'Deleted Successfully'
        //     })
        //     return response
        // },
        me:  (_,args,{req,res}) => {
            if(!req.userId) {
                return null
            } 
            console.log('Inside Me',req.userID)
            const response = model.users.findByPk(req.userId)
            return response
        }
        
    },
    Mutation: {
        register: async (_,{name,password,email}) => {
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
                password: hashPassword
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
            const validToken = jwt.sign({ userId: user.id }, 'privateKey',{ expiresIn: '60s' }, { algorithm: 'RS256' })
            res.cookie('valid-token',validToken)
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
        createReward: async (parent,{name,amount,message},context,info) => {
            const response = await Rewards.create({
                name,
                amount,
                message,
            })
            .then((reward) => {
                console.log('after suc',reward)
                let obj = new Rewards({
                    id: reward.id,
                    name: reward.name,
                    amount: reward.amount,
                    message: reward.message,
                    user_id: reward.user_id
                })
                return obj
            })
        }
    }   
}
module.exports = resolvers