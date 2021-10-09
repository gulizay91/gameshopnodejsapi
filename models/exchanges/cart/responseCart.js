function ResponseCart (products, totalQty, totalPrice) {
    this.products = products;
    this.totalQty= totalQty;
    this.totalPrice= totalPrice;
}

module.exports = { ResponseCart };