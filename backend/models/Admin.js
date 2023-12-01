import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        secondName: {
            type: String,
            required: true,
        },
        thirdName: {
            type: String,
            required: false,
        },
        bithdate: {
            type: Date,
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
        nick: {
            type: String,
            required: false,
            unique: true,
        },
        Role: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Admin', AdminSchema);