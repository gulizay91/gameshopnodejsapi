const express = require('express');
const app = express();
const cors = require('./middleware/cors.middleware');
const logger = require('./middleware/logger.middleware');
const errorHandling = require('./middleware/errorHandling.middleware');
const checkAuth = require('./middleware/auth.middleware');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./config/swagger.config.json');


// Import Configs
require('dotenv').config({
    path: './config/index.env'
});
require('./config/config');

// Import Routes
const userRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');
//const basketRouter = require('./routes/basket.routes'); // [Obsolete(use cart)]
const cartRouter = require('./routes/cart.routes');

// Middleware
app.use(express.json());
app.use(logger);
app.use(cors);
app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
//app.use('/baskets', checkAuth, basketRouter); // [Obsolete(use cart)]
app.use('/carts', checkAuth, cartRouter);

app.use(errorHandling);

app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.API_URL + ":" + process.env.PORT + " adresine gelen istekler dinleniyor...");
});

app.get('/', (req, res) => {
    res.send("GameShop Node.js Restful API");
});
