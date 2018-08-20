const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 8;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please input the password. password consists of minimum 6 characters with combination of letter and number'],
    validate: {
      validator: function(pwd){
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        return re.test(pwd)
      },
      message: 'password consists of minimum 6 characters with combination of letter and number' 
    }
  }
}, {timestamps: true})

UserSchema.statics.addTag = function (tag) {
  return this.tags.push(tag);
}

UserSchema.pre('save', function (next){
  let user = this;

  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(saltRounds, function(err, salt){
    if(err) {
      throw err;
    }

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) {
        throw err;
      }
      
      user.password = hash;
      return next()
    })
  })
})

UserSchema.methods.checkPwd = function (pwd, cb){
  let user = this;
  bcrypt.compare(pwd, user.password, function(err, isMatched){
    if(err) {
      throw err;
    }
    
    cb(isMatched)
  })
}


const User = mongoose.model('User', UserSchema);

module.exports = User;