function UserDetail(id = "", username = "", email = "", firstName = "", lastName = "", phoneNumber = "") {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

function ResponseAuth (userDetail, token) {
    this.userDetail = userDetail;
    this.token= token;
}

module.exports = { ResponseAuth, UserDetail };