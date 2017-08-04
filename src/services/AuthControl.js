
var offers = require('./OfferControl.js');
var xml2js = require('xml2js');

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
        callback(null, 'Username or password empty');
        return;
      }
      var parser = new xml2js.Parser();
      var id_request = new XMLHttpRequest();
      id_request.onreadystatechange = (e) => {
        if (id_request.readyState !== 4) {
          return;
        }

        if (id_request.status === 200) {
          var id_request_text = id_request.responseText;
          parser.parseString(id_request_text, function (err, result) {
            if (err) {
              callback(err, 'An error occurred');
            }
            else {
              var id_request_json = JSON.parse(result['wddxPacket']['data']['string'])[0];
              if (id_request_json.status === 'success') {
                var userId = id_request_json.memberID;

                var user_request = new XMLHttpRequest();
                user_request.onreadystatechange = (e) => {
                  if (user_request.readyState !== 4) {
                    return;
                  }

                  if (user_request.status === 200) {
                    var user_request_text = user_request.responseText;
                    parser.parseString(user_request_text, function (err, result) {
                      if (err) {
                        callback(err, 'An error occurred');
                      }
                      else {
                        var user_request_json = JSON.parse(result['wddxPacket']['data']['string'])[0];
                        if (user_request_json.status === 'success') {
                          user = Object.assign({}, user_request_json);
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
