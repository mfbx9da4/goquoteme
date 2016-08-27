import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new mongoose.Schema({
  // password: {type: String},
  username: {type: String, trim: true, required: true, unique: true},
  email: {type: String, trim: true, unique: true},
  admin: {type: Boolean, default: false},
  name: {
    first: {type: String},
    last: {type: String},
  },
}, {timestamps: true});

User.plugin(passportLocalMongoose, {
  errorMessages: {
    NoSaltValueStoredError: 'Wrong password',
    IncorrectPasswordError: 'Wrong password',
    IncorrectUsernameError: 'No user with this username',
  },
});

export default mongoose.model('User', User);
