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

// Middleware
app.use(express.json());
app.use(logger);
app.use(cors);
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use('/users', userRouter);
app.use('/categories', checkAuth, categoryRouter);
app.use('/products', checkAuth, productRouter);

app.use(errorHandling);

app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.API_URL + ":" + process.env.PORT +" adresine gelen istekler dinleniyor...");
});

app.get('/', (req, res) => {
    res.send("GameShop Node.js Restful API");
});
