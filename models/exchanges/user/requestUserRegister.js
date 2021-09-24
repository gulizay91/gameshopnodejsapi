function UserRegisterModel(username = "", password = "", email = "", firstName = "", lastName = "", phoneNumber = "") {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

module.exports = UserRegisterModel;