function CartSaveModel(userId = "", productId = "", increaseOrDecrease = 0) {
    this.userId = userId;
    this.productId = productId;
    this.increaseOrDecrease = increaseOrDecrease; // 1: increase, -1: decrease
}

module.exports = CartSaveModel;