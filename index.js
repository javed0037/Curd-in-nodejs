var express = require('express');
var app = express();
var mongoose = require('mongoose');
var user = require('./models/users');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var express = require('express');
var jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost/SignUp');
app.post('/LoginUser',function(req,res){
  let email = req.body.email;
  user.findOne({email:email},function(err ,data)
{
if(err){
  return res.json({
    message : 'not ccorrect email'
  })
}
if(data){
        bcrypt.compare(req.body.password,data.password ,function(err,data){
          if(data){
            var Admin1 ={
              name : user.name
            };
          var token = jwt.sign(Admin1, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
              // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
          }
      })
   }
 })
app.post('/CreateUser',function(req,res){
  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;
  if(name && password && email){
    bcrypt.hash(password , 10 ,function(err,hash){
      if(err){
       return res.json({
         message : 'password not bcypt'
       })
      }
    var userObj = {
    name : name,
    password :hash,
    email : email
    }
    user.create(userObj,function(err,data){
      if(err) {
        res.json({
          message : 'data not entered sucessfully',
          status: 400
        })
      }
        if(data){
          return  res.json({
          status:200,
          message : 'information entered sucessfully',
          data :data
        })
        }
        else{
          return res.json({
            message :'you have entered wrong info',
            data :data,
            status : 400
          })
        }
      });
   })
}
})

app.listen(8081,()=> {
  console.log('listening on prot :8081')
});
