import mongoose from 'mongoose';

const TovarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		unique: false,
        required: true,
    }
});

export default mongoose.model('Tovar', TovarSchema);