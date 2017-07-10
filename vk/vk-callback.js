const apiAdapter = require('./api-adapter')
const responder = require('./responders/what-dog-responder')

responder.setApiAdapter(apiAdapter)

var _dbDriver = null

const use = (driver) => {
  _dbDriver = driver
  driver.getGroups().then(groups => {
    let newGroups = {};
    groups.map(g => {
      newGroups[g.vk_id] = g
    })
    responder.setGroups(newGroups)
  })
}

const getResponse = (options) => {
  return responder.handleRequest(options)
}

exports.getResponse = getResponse
exports.use = use