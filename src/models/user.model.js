import moongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new moongoose.Schema({
    name: { type: String, required: true,},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false},
    avatar: { type: String, required: true },
    background: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = moongoose.model('user', userSchema);

export default User;