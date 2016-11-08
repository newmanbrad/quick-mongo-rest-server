import mongoose from 'mongoose';

const userTypesModel = mongoose.model('userTypes', new mongoose.Schema({
  _id: {type: String},
  type: { type: String, required: true, ref: 'user' }
}));

export default userTypesModel
