function UserAddress(_id = "", userId = "", title = "", building = "", street = "", country = "", city = "") {
    this._id = _id;
    this.userId = userId;
    this.title = title;
    this.building = building;
    this.street = street;
    this.country = country;
    this.city = city;
}

function ResponseUserAddress (userAddress) {
    this.userAddress = userAddress;
}

module.exports = { UserAddress, ResponseUserAddress };