const express = require('express');

const app = express.Router();
const { getDetails, insertDetails, updateDetails, deleteDetails, getDetailsWithLimit } = require('../repositories/todos');

// get todo items
app.get('/get-todos/:user_id', async (req, res) => {
  try {
    const userId = req.params['user_id']
    const offset = Number(req.query['offset'])
    const limit = Number(req.query['limit'])
    const query = generateQueryForGetDetails(userId)
    const [response, todos] = await Promise.all([
      getDetails(query, getCommonProjection(), 'todo_master'),
      getDetailsWithLimit(query, getCommonProjection(), offset, limit,'todo_master')
    ])
    const resp = {}
    resp.count = response.length
    resp.data = todos
    console.log('fetched todo details : %j , %s', resp , resp)
    if (resp && resp.count > 0) {
    res.status(200).json(resp)
    } else {
      res.status(204).json()
    }
  } catch (error){
    res.status(500).json(error)
    console.log('error while getting details : %j , %s', error , error)
    throw error
  }
});

// add a todo item
app.post('/add-todos', async (req, res) => {
  try {
    const reqBody = req.body
    const todos = await insertDetails([reqBody], getCommonProjection(),'todo_master')
    console.log('added details : %j , %s', todos , todos)
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error)
    console.log('error while inserting details: %j , %s', error , error)
    throw error
  }
});

// delete a todo item
app.delete('/remove-todos/:user_id/:todo_id', async (req, res) => {
  try {
    const query = generateQueryForDeleteDetails(req.params)
    const response = await deleteDetails(query, 'todo_master')
    console.log('deleted details: %j , %s', response , response)
    res.status(200).json('deleted Successfully')
  } catch (error) {
    res.status(500).json(error)
    console.log('error while deleting details: %j , %s', error , error)
  }
});

// update a todo item
app.post('/update-todos', async (req, res) => {
  try {
    const query = generateQueryForUpdateDetails(req.body)
    const response = await updateDetails(query, generateUpdateJson(req.body), 'todo_master')
    console.log('updated details : %j , %s', response , response)
    res.status(200).json('updated Successfully')
  } catch (error) {
    res.status(500).json(error)
    console.log('error while updating details: %j , %s', error , error)
  }
});


function generateQueryForGetDetails (userId) {
  return getQuery('user_id', '$eq', Number(userId))
}

function generateQueryForUpdateDetails (reqBody) {
  const query = []
  query.push(getQuery('todo_id', '$eq', Number(reqBody.todo_id)))
  query.push(getQuery('user_id', '$eq', Number(reqBody.user_id)))
  return getQueryArrayForOperation('$and', query)
}

function generateQueryForDeleteDetails (reqBody) {
  const query = []
  query.push(getQuery('todo_id', '$eq', Number(reqBody.todo_id)))
  query.push(getQuery('user_id', '$eq', Number(reqBody.user_id)))
  return getQueryArrayForOperation('$and', query)
}

function generateUpdateJson(reqBody) {
  const json = {}
  json['title'] = reqBody.title
  json['description'] = reqBody.description
  return getUpdateJsonFormat(json)
}

const getUpdateJsonFormat = (updateJson) => {
  let json = {}
  json['$set'] = updateJson
  console.log(`updateJson: %j`,json)
  return json
}

const getQuery = (fieldName, operation, value) => {
  let query = {}
  query[fieldName] = {}
  query[fieldName][operation] = value
  console.log(`Query to be executed: %j`,query)
  return query
}

const getQueryArrayForOperation = (operation, query) => {
  let operatedQuery = {}
  operatedQuery[operation] = query
  console.log(`Query operation to be executed: %j`,operatedQuery)
  return operatedQuery
}

function getCommonProjection() {
  const json = {}
  json['_id'] = false
  json['__v'] = false
  return json
}


module.exports = app;

