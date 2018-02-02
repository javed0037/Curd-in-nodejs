const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
  name : {
    type : String
  },
  email : {
    type : String
  },
  password : {
    type : String
  },
  status : {
    type : Boolean
  }
});
module.exports = mongoose.model('user' , user);
