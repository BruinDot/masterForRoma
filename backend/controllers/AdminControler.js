import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import AdminModel from "../models/Admin.js";

export const register = async (req, res) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new AdminModel({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            thirdName: req.body.thirdName,
            bithdate: req.body.bithdate,
            phone: req.body.phone,
            email: req.body.email,
            passwordHash: hash,
            nick: req.body.nick,
            // cardholderName: req.body.cardholderName,
            // cardNum: req.body.cardNum,
            // cardDate: req.body.cardDate,
            // cardCode: req.body.cardCode,
            // adress: req.body.adress,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: admin._id,
            }, 
            'secret1',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...adminData } = admin._doc;

        res.json({
            ...adminData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await AdminModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: admin._id,
            }, 
            'secret1',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...adminData } = admin._doc;

        res.json({
            ...adminData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await AdminModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...adminData } = user._doc;

        res.json(adminData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};