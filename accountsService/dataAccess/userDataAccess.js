//**** Setup *****//

require('./mongooseConnection');
var userModel = require('../schemas/userSchema');

var q = require('q');

module.exports = {
    saveUser: saveUser,
    getUsers: getUsers
};
//****** Setup ********//

//****** Implementation ******//
function saveUser(user){
    var deferred = q.defer();

    var newUser = new userModel(user);

    newUser.save(function (err, user) {
        if(err){
            console.log('An error occurred saving the user: ' + err);
            deferred.reject(err);
        } else {
            deferred.resolve({"status": "success", "message": "User saved successfully"});
        }
    });

    return deferred.promise;
}

function getUsers(){
    var deferred = q.defer();

    userModel.find({}, function(err, users){
        if(err){
            console.log('Error occurred retrieving users: ' + err);
            deferred.reject({"message": "Could not retrieve list of users"});
        } else {
            deferred.resolve(users);
        }
    });

    return deferred.promise;
}

