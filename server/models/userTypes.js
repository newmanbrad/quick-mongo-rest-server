import mongoose from 'mongoose';

const userTypesModel = mongoose.model('userTypes', new mongoose.Schema({
  type: { type: String, required: true, ref: 'user' }
}));

export default userTypesModel
