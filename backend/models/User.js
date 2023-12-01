import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fio: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        adress: {
            type: String,
            required: false,
            default: null,
        },
        Role: {
            type: String,
            default: "guest",
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);