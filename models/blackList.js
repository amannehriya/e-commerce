const mongoose = require('mongoose');
//ye schema is liye banaya kyunki jb hm logout krenge to jo hm tken use kr rhe the usko is schema me daal denge
//toh jb hm login krenge toh jo token hm use kr rhe the usko hm is schema me check krenge ki wo token hai ya nhi
//isse hm logout krne k baad bhi jo token hm use kr rhe the usko use nhi kr payenge

const blackListSchema = new mongoose.Schema({
    token: {type: String, required: true},
}, {timestamps: true});

blackListSchema.index({token: 1}, {unique: true});

module.exports = mongoose.model('blackList', blackListSchema);