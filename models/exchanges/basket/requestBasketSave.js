function BasketSaveModel(userId = "", productId = "", increaseOrDecrease = 0) {
    this.userId = userId;
    this.productId = productId;
    this.increaseOrDecrease = increaseOrDecrease;
}

module.exports = BasketSaveModel;