import UserModel from "../models/User.js";

export default async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден',
                })
            } else if (user.Role === 'moderator' || user.Role === 'admin') {
                next()
            }
            else {
                res.status(403).json({
                    message: 'Нет доступа',
                })
            }
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
}