
const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express')

const bodyParser = require('body-parser')

AWS.config.update({ region: process.env.TABLE_REGION });  
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "posts";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "postId";
const partitionKeyType = "S";
const sortKeyName = "createdAt";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/posts";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}



/************************************
 * HTTP Get method to get all posts of a user *
 ************************************/

app.get(path , async function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  await dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json(data.Items);
    }
  }
  )
});

/*****************************************
 * HTTP Get method for getting a single post of a user *
 *****************************************/

app.get(path + '/:postId', async function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  const postId = req.params.postId;

  const createdAt = req.params.createdAt;

  const params = {
    TableName: tableName,
    Key: {
      postId: postId,
      createdAt: createdAt
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json(data.Item);
    }
  });
});

 

/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, async function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  console.log('req.body', req.body)

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  await dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      console.log('err', err)
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      console.log('data', data)
      res.json({ success: 'post call succeed!', url: req.url, data: data })
    }
  }
  )
    
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path ,async function  (req, res)  {
  try{
    // asscess payload from request
    var newData = JSON.stringify(req.body)

    const payload = await JSON.parse(newData);
    // get journeyId from payload
    const postId = payload.postId;
    // get createdAt from payload
    const createdAt = payload.createdAt;

    if(userIdPresent && req.apiGateway){
      req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    if(!journeyId || !createdAt){
      res.statusCode = 500;
      res.json({error: 'PostID or createdAt is missing', body: req.body});
    }
    

    const params = {
      TableName: tableName,
      Key: {
        postId: postId,
        createdAt: createdAt
      }
    };

    dynamodb.delete( params , (err, data)=> {
      if (err) {
        res.statusCode = 500;
        res.json({error: err , params: params});
      } else {
        res.json({ data: data, params: params});
      }
    });

  }
  catch(e){
    res.statusCode = 500;
    res.json({error: e.message, url: req.url, body: req.body});
  }
 
});


module.exports = app
