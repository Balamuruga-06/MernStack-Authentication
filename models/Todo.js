const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Todo",TodoSchema);