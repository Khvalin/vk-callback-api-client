var _connectionString = null

var _getGroups = () => {
  return _makeRequest(db => {
    return db.collection('groups').find().toArray()
  })
}


const _makeRequest = (requestFunc) => {
  return new Promise((resolve, reject) => {
    var MongoClient = require('mongodb').MongoClient

    MongoClient.connect(_connectionString, (err, db) => {
      if (err) {
        reject(err)
        db.close() //TODO: see if it's needed here
        return
      }
      console.log("Connected successfully to server");

      const result = requestFunc(db)
      db.close()
      resolve(result)
    });
  });
}

exports.setConnectionString = (connectionString => {
  _connectionString = connectionString
})

exports.getGroups = _getGroups