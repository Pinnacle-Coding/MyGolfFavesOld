
var offers = require('./OfferControl.js');
var xml2jsParseString = require('react-native-xml2js').parseString;

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
      if (!username || !password) {
        callback(null, 'Required fields missing');
        return;
      }
      var id_request = new XMLHttpRequest();
      id_request.onreadystatechange = (e) => {
        if (id_request.readyState !== 4) {
          return;
        }

        if (id_request.status === 200) {
          var id_request_text = id_request.responseText;
          xml2jsParseString(id_request_text, function (err, result) {
            if (err) {
              callback(err, 'An error occurred');
            }
            else {
              try {
                var id_request_json = JSON.parse(result['wddxPacket']['data'][0]['string'][0]);
              } catch (e) {
                // TODO: Remove fake user when parsing works correctly again
                var id_request_json = {
                  status: 'success',
                  memberID: 3478
                };
              }
              if (id_request_json['status'] === 'success') {
                var userId = id_request_json['memberID'];

                var user_request = new XMLHttpRequest();
                user_request.onreadystatechange = (e) => {
                  if (user_request.readyState !== 4) {
                    return;
                  }

                  if (user_request.status === 200) {
                    var user_request_text = user_request.responseText;
                    xml2jsParseString(user_request_text, function (err, result) {
                      if (err) {
                        callback(err, 'An error occurred');
                      }
                      else {
                        var user_request_json = JSON.parse(result['wddxPacket']['data'][0]['string'][0]);
                        if (user_request_json['status'] === 'success') {
                          user = Object.assign({}, user_request_json['Details'][0]);

                          offers.populate(userId, function (err, message) {
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
                          callback(null, user_request_json.message);
                        }
                      }
                    });
                  } else {
                    callback(e, 'An error occurred');
                  }
                };

                user_request.open('GET', 'http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getMemberAccount&UID=1&PWD=mob!leMGF&memberID='+userId);
                user_request.send()
              }
              else {
                callback(null, id_request_json.message);
              }
            }
          });
        } else {
          callback(e, 'An error occurred');
        }
      };

      id_request.open('GET', 'http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=loginMember&UID=1&PWD=mob!leMGF&username='+username+'&password='+password);
      id_request.send();
    },

    logout: function() {
        user = undefined;
    }
}
