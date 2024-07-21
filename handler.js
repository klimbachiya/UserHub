const { GraphQLObjectType, GraphQLString, GraphQLSchema, graphql, GraphQLList } = require('graphql');
const { dynamoDb, getUser, listUsers, saveUser, deleteUser } = require('./dynamodb');
const uuid = require('uuid');  

const userType = new GraphQLObjectType({
    name: 'User',
    fields:{
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user:{
                type: userType,
                args: {
                    id: {type: GraphQLString}
                },
                resolve: async (_,{id}) => getUser(id)
            },
            userList:{
                type: new GraphQLList(userType),
                resolve: async () => listUsers()
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields:{
            addUser:{
                type: userType,
                args:{
                    name: {type: GraphQLString}
                },
                resolve: async (_,{name}) => {
                    let id = uuid.v1();
                    await saveUser(id, name);
                    return {id, name};
                }
            },
            updateUser:{
                type: userType,
                args:{
                    id:{type: GraphQLString},
                    name: {type: GraphQLString}
                },
                resolve: async (_,{id,name}) => {
                    await saveUser(id, name)
                    return {id, name};
                }
            },
            deleteUser:{
                type: userType,
                args:{
                    id:{type: GraphQLString}
                },
                resolve: async (_,{id}) =>{
                    const user = await getUser(id);
                    await deleteUser(id);
                    return user;
                }
            }
        }
    })
});

exports.graphqlHandler = async (event) => {
    const data = await graphql(schema, JSON.parse(event.body).query)
    return{
        statusCode: 200,
        body: JSON.stringify(data),
    }
}