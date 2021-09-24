function ProductSaveModel(categoryId = "", title = "", description = "", price = 0, rating = 0, imageLogo = "", image = "") {
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.rating = rating;
    this.imageLogo = imageLogo;
    this.image = image;
}

module.exports = ProductSaveModel;