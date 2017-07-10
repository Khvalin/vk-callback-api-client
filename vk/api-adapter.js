const {
  URL,
  URLSearchParams
} = require('url');

const https = require('https')

const _createApiRequest = function createVkApiRequest(url, urlParams) {
  let params = new URLSearchParams(urlParams);
  params.append('v', '5.0')

  return https.get(`${ url }?${ params.toString() }`)
}

const _sendMessage = function sendVkMessage(messageData) {
  let url = 'https://api.vk.com/method/messages.send'

  return _createApiRequest(url, messageData)
}

const _configure = function(defaults) {}

exports.sendMessage = _sendMessage
exports.configure = _configure