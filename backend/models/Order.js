import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    fio: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    products: {
        type: Array,
        unique: false,
    },
    fullPrice: {
        type: Number,
        required: true,
    }, 
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: false,
	}

});

export default mongoose.model('Order', OrderSchema);