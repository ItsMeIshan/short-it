const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    orignal_url: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    short_url: {
        type: String,
        unique: true,     
    }
});
let urlModel = mongoose.model('Url', urlSchema);
module.exports = urlModel;
