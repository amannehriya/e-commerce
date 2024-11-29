const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log(err));

module.exports = mongoose;
