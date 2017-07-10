let _groups = null
let _apiAdapter = null

const _eventHandlers = {
  'default': function() {
    return 'OK'
  },

  'message_new': function(options, reply = `Hello, ${new Date()}!`) {
    _apiAdapter.sendMessage({
      access_token: _groups[options.group_id].vk_access_token,
      user_id: options.object.user_id,
      message: reply
    })

    return _eventHandlers.default(options)
  },

  'confirmation': (options) => {
    return _groups[options.group_id].vk_confirmation_token
  }
}

module.exports = {
  eventHandlers: _eventHandlers,

  setApiAdapter: function(apiAdapter) {
    _apiAdapter = apiAdapter
  },

  setGroups: function(groups) {
    _groups = groups
  },

  handleRequest: function(requestData) {
    var type = requestData.type
    type = (type in this.eventHandlers) ? type : 'default'

    return this.eventHandlers[type](requestData)
  }
}