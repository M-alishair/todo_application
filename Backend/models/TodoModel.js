const  mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  completed : {type: Boolean , default : false},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo' , todoSchema)