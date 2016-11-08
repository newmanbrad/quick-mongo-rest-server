import mongoose from 'mongoose';

const userModel = mongoose.model('user', new mongoose.Schema({
  _id: {type: String},
  email: { type: String, index: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  permissions: {
    admin: { type: Boolean }
  }
}));

export default userModel
