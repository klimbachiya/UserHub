const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, GetCommand, ScanCommand, PutCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb')


let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8007',
  };
}

const client = new DynamoDBClient(options);
const dynamo = DynamoDBDocumentClient.from(client);

exports.getUser = async (id) =>{
    const data = await dynamo.send(
        new GetCommand({
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
              id: id
            },
          })
    );
    return data.Item;
}

exports.listUsers = async () =>{
    const data = await dynamo.send(
        new ScanCommand({ TableName: process.env.DYNAMODB_TABLE })
      );
    return data.Items;
}

exports.saveUser = async(id, name) =>{
    await dynamo.send(
        new PutCommand({
            TableName: process.env.DYNAMODB_TABLE,
            Item:{
                id: id,
                name: name,
            }
        })
    )
}

exports.deleteUser = async(id) =>{
    await dynamo.send(
        new DeleteCommand({
          TableName: process.env.DYNAMODB_TABLE,
          Key: {
            id: id,
          },
        })
      );
}