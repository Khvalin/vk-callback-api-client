require('dotenv').config()
const DEVELOPMENT_MODE = ('DEVELOPMENT' === process.env.environment)

const express = require('express')
const BODY_PARSER = require('body-parser')
const vk = require('./vk/vk-callback')
const mongo_db_driver = require('./db_drivers/mongo-driver')

mongo_db_driver.setConnectionString(process.env.mongo_connection_string)
vk.use(mongo_db_driver)

const app = express()
const SERVER_PORT = process.env.port || 4500

app.use(BODY_PARSER.json()); // for parsing application/json

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.post('/vk/callback/', function(req, res) {
  DEVELOPMENT_MODE && console.log(req.body);
  res.send(vk.getResponse(req.body))
})

app.listen(SERVER_PORT, function() {
  console.log(`Web app listening on port ${SERVER_PORT}!`)
})