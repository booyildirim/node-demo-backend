

var UserSchema = function (iduser, name, username, access, password) {
    this.iduser = iduser;
    this.name = name;
    this.username = username;
    this.access = access;
    this.password = password;
};

module.exports = UserSchema;