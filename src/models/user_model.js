import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    userName : { type: String, unique: true },
    role: { type: mongoose.Schema.ObjectId, ref: 'role' },
    fullName: { type: String },
    email : { type: String },
    password: { type: String },
    phoneNo: { type: String },
    verified: { type: Boolean, default: false },
    status:  { type: String , default: "Active" },
}, { timestamp: true });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

UserSchema.pre('save', async function save() {
  if (!this.isModified('password') || !this.password) return true;
  const password = await Bcrypt.hash(this.password, 10);
  this.password = password;
  return true;
});

const User = mongoose.model('user', UserSchema)

export default User;