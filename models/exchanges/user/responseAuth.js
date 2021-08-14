function UserDetail(id = "", username = "", email = "", firstName = "", lastName = "") {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
}

function ResponseAuth (userDetail, token) {
    this.userDetail = userDetail;
    this.token= token;
}

module.exports = { ResponseAuth, UserDetail };