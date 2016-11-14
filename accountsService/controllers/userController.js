var db = require('../dataAccess/userDataAccess');

module.exports = {
    saveUser: saveUser,
    getUsers: getUsers
};

function saveUser(user){
    return db.saveUser(user);
}

function getUsers() {
    return db.getUsers();
}