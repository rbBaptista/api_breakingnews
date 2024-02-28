import moongoose from 'mongoose';

const userSchema = new moongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    background: { type: String, required: true },
});

const User = moongoose.model('user', userSchema);

export default User;