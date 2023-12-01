import OrderModel from "../models/Order.js";

export const create = async (req, res) => {
    try {

        const doc = new OrderModel({
            fio: req.body.fio,
			userId : req.body.userId,
            phone: req.body.phone,
            products: req.body.products,
            fullPrice: req.body.fullPrice,
        });

        const order = await doc.save();

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось оформить заказ',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вывести заказы',
        });
    }
}

export const getUser = async (req, res) => {
    try {
		const userId = req.userId;
        const orders = await OrderModel.find({'userId': userId});
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вывести заказы',
        });
    }
}