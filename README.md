# aws-serverless-graphql-api-with-dynamodb

GraphQL, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time. This repository helps one build Serverless User CRUD application with serverless-offline & serverless-dynamoDB that helps one test same in local. To create GraphQL APIs, npm module [graphql](https://www.npmjs.com/package/graphql) is used. This provides two important capabilities: building a type schema and serving queries against that type schema. More details on same is avaialble at https://github.com/graphql/graphql-js/

## Deployment

```bash
npm install -g serverless
npm install
serverless deploy
```

## Local Development

### Install DynamoDB Locally

Download dynamoDB locally per [dynamoDB local installation steps](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html). Start dynamoDB locally using below step:

```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -inMemory -port <portNumer>
```

### Setup

```bash
npm install
serverless plugin install -n serverless-dynamodb
serverless plugin install -n serverless-offline
```

One should see 2 plugins namely serverless-dynamodb & serverless-offline at the end of serverless.yml file.

### Run service offline

```bash
serverless offline start
```

### Usage

You can create, retrieve, update, or delete users with the following commands:

#### Create a User

```bash
curl --location --request POST 'http://localhost:3000/dev/user' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {addUser(name: \"kangana\") {id,name}}\r\n","variables":{}}'
```

Example Result:
```bash
"{\"data\":{\"addUser\":{\"id\":\"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\",\"name\":\"kangana\"}}}"
```

#### List all Todos

```bash
curl --location --request POST 'http://localhost:3000/dev/user' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query{userList{id,name}}","variables":{}}'
```

Example output:
```bash
"{\"data\":{\"userList\":[{\"id\":\"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\",\"name\":\"kangana\"}]}}"
```

#### Get one User

```bash
curl --location --request POST 'http://localhost:3000/dev/user' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query {\r\n\tuser(id: \"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\") {\r\n\t\tid\r\n\t\tname\r\n\t}\r\n}\r\n","variables":{}}'
```

Example Result:
```bash
"{\"data\":{\"user\":{\"id\":\"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\",\"name\":\"kangana\"}}}"
```

#### Update a User

```bash
curl --location --request POST 'http://localhost:3000/dev/user' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {updateUser(id: \"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\", name: \"mann\") {id,name}}\r\n","variables":{}}'
```

Example Result:
```bash
"{\"data\":{\"updateUser\":{\"id\":\"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\",\"name\":\"mann\"}}}"
```

#### Delete a User

```bash
# Replace the <id> part with a real id from your todos table
curl --location --request POST 'http://localhost:3000/dev/user' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {deleteUser(id: \"c9c7ab60-48d3-11ef-a57c-b7ee32129bb9\") {id,name}}\r\n","variables":{}}'
```

No output