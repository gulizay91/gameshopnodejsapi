const mongoose = require('mongoose');

// Connect to DB
// mongoose.connect(process.env.MONGODB_CONNECTION, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// }, () => {
//     console.log("connected to DB")
// });

const connectMongoDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

module.exports = connectMongoDB;