const whatDog = require('what-dog');
const access = require('safe-access');

const _defaultResponder = require('./default-responder')

const whatDogEventHandlers = Object.create(_defaultResponder.eventHandlers, {
  'message_new': {
    value: function messageNewHandler(options) {
      const photo = access(options, 'object.attachments[0].photo')
      const photoUrl = photo && (photo.photo_604 || photo.photo_130 || photo.photo_75);

      console.log(photoUrl);

      const baseMethod = _defaultResponder.eventHandlers.message_new;

      whatDog(photoUrl)
        .then(doggyData => {
          baseMethod(options, JSON.stringify(doggyData))
        })
        .catch(err => baseMethod(options, err))

      return _defaultResponder.eventHandlers.default(options)
    }
  }
});

module.exports = Object.create(_defaultResponder, {
  eventHandlers: {
    value: whatDogEventHandlers
  }
})