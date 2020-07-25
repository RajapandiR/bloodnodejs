import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const TokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    token: { type: String, required: true, expires: 43200 },
}, { timestamp: true });

TokenSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Token = mongoose.model('token', TokenSchema)

export default Token;