
var offers = require('./OfferControl.js');

var user = undefined;

module.exports = {

    isAuthenticated: function() {
      return user !== undefined;
    },

    getUser: function() {
      return user;
    },

    /**
     * Login function
     *
     * @param username The user's account name
     * @param password The user's password
     * @param callback A function taking returned with two arguments: error (or null) and message (not null when something went wrong but not an actual error)
     */
    login: function(username, password, callback) {
      fetch('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=loginMember&UID=1&PWD=mob!leMGF&username='+username+'&password='+password)
        .then((response) => {
            var txt = response.text();
            var iBegin = txt.indexOf('<string>');
            var iEnd = txt.indexOf('</string>');
            return JSON.parse(txt.substring(iBegin + 8, iEnd))[0]
        })
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === 'success') {
            var userId = responseJson.memberID;
            fetch('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getMemberAccount&UID=1&PWD=mob!leMGF&memberID='+userId)
              .then((response) => response.json()[0])
              .then((responseJson) => {
                if (responseJson.status === 'success') {
                  user = Object.assign({}, responseJson);
                  delete user['status'];
                  offers.populate(function (err, message) {
                    if (err) {
                      callback(err, 'An error occurred')
                    }
                    else if (message) {
                      callback(null, message);
                    }
                    else {
                      callback(null, null);
                    }
                  });
                }
                else {
                  callback(null, responseJson.message);
                }
              })
              .catch((error) => {
                callback(error, 'An error occurred');
              });
          }
          else {
            callback(null, responseJson.message);
          }
        })
        .catch((error) => {
          callback(error, 'An error occurred');
        });
    },

    logout: function() {
        user = undefined;
    }
}
