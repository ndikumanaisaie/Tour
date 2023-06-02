import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: false },
	googleId: { type: String, required: false },
	phoneNumber: { type: String, required: true },
	id: { type: String },
});

export default mongoose.model('Users', userSchema);