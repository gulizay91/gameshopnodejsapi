function BasketSaveModel(_id = "", products = [], totalQty = 0, totalPrice = 0, userId = "") {
    this._id = _id;
    this.products = products;
    this.totalQty = totalQty;
    this.totalPrice = totalPrice;
    this.userId = userId;
}

module.exports = BasketSaveModel;