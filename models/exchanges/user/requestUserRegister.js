function UserRegisterModel(username = "", password = "", email = "", firstName = "", lastName = "") {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
}

module.exports = UserRegisterModel;