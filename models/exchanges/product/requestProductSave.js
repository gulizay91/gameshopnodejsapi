function ProductSaveModel(categoryId = "", title = "", description = "", price = 0, rating = 0) {
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.rating = rating;
}

module.exports = ProductSaveModel;