import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const RoleSchema = mongoose.Schema({
    role : { type: String, unique: true },
    status: { type: String , default: "Active" },
}, { timestamp: true });

RoleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Role = mongoose.model('role', RoleSchema)

export default Role;