function UserAddressUpdateModel(id= "", title = "", building = "", street = "", country = "", city = "") {
    this._id = id;
    this.title = title;
    this.building = building;
    this.street = street;
    this.country = country;
    this.city = city;
}

module.exports = UserAddressUpdateModel;