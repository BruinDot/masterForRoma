import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema({
    tovarId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Tovar',
		unique: false,
	},
    schema: {
        type: String,
    },
    price: {
        type: Number,
    }
},
{
    timestamps: true,
},
);

export default mongoose.model('priceHistory', priceHistorySchema);