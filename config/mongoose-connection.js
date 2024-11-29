const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`${config.get('MONGODB_URI')}/e-commerce`)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log(err));

module.exports = mongoose;
