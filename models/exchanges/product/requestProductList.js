function ProductListRequestModel(categoryId = "", page = 0, limit = 10) {
    this.categoryId = categoryId;
    this.page = page;
    this.limit = limit;
}

module.exports = ProductListRequestModel;