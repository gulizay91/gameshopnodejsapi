function UserAddressSaveModel(userId = "", title = "", building = "", street = "", country = "", city = "") {
    this.userId = userId;
    this.title = title;
    this.building = building;
    this.street = street;
    this.country = country;
    this.city = city;
}

module.exports = UserAddressSaveModel;