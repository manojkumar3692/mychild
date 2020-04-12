const {GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
} = require('graphql')
const StockType = new GraphQLObjectType({
    name: 'stocks',
    fields: {
        id: {type: GraphQLID},
        name: {type:GraphQLString},
        price: {type:GraphQLString},
        sku: {type:GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString}
    }
})
const model = require('../model/index')
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        fields: {
            stocks: {
                type: GraphQLList(StockType),
                resolve: (root,args,context,info) => {
                  return model.stocks.findAll().then(users => {
                        return users
                      });
                }
            },
            stock: {
                type: StockType,
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLID)
                    }
                },
                resolve: (root,args,context,info) => {
                    return model.stocks.findByPk(args.id).then(users => {
                        return users
                      });
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {
            stock: {
                type: StockType,
                args: {
                    name: {type: GraphQLNonNull(GraphQLString)},
                    price: {type: GraphQLNonNull(GraphQLString)},
                    sku: {type: GraphQLNonNull(GraphQLString)}
                },
                resolve: (root,args,context,info) => {
                    return model.stocks.create(args).then((result) => {
                        return result
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },
            deleteStock: {
                type: GraphQLList(StockType),
                args: {
                    id: {type: GraphQLNonNull(GraphQLID)}
                },
                resolve: (root,args,context,info) => {
                    return model.stocks.findByPk(args.id)
                    .then(async (stock) => {
                        await stock.destroy()
                        const x = model.stocks.findAll()
                        return x
                    })
                }
            },
            updateStock: {
                type: StockType,
                args: {
                    id: {type: GraphQLID},
                    name: {type: GraphQLString},
                    price: {type: GraphQLString},
                    sku: {type: GraphQLString}
                },
                resolve: async (root,args,context,info) => {
                    return await model.stocks.findOne({where: {id: args.id}})
                    .then( async (stock) => {
                        await stock.update({
                            id: args.id,
                            name: args.name,
                            price: args.price,
                            sku: args.sku
                        })
                        return model.stocks.findByPk(args.id)
                    })

                }
            }
        }
    })
})

module.exports = schema