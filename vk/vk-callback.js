const apiAdapter = require('./api-adapter')

const responders = {
  'default': function() {
    return 'OK'
  },

  'message_new': function(options) {
    apiAdapter.sendMessage({
      access_token: _groups[options.group_id].vk_access_token,
      user_id: options.object.user_id,
      message: `Hello, ${new Date()}!`
    })

    return responders.default(options)
  },

  confirmation: (options) => {
    return _groups[options.group_id].vk_confirmation_token
  }
}

var _dbDriver = null
var _groups = {}

const use = (driver) => {
  _dbDriver = driver
  driver.getGroups().then(groups => {
    _groups = {}
    groups.map(g => {
      _groups[g.vk_id] = g
    })
  })
}

const getResponse = (options) => {
  var type = options.type
  type = (type in responders) ? type : 'default'

  return responders[type](options)
}

exports.getResponse = getResponse
exports.use = use