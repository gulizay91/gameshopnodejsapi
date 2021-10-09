module.exports = function ProductGetRequestModel(id = null, categoryId = "", page = 0, limit = 10) {
    this.id = id;
    this.categoryId = categoryId;
    this.page = page;
    this.limit = limit;
};