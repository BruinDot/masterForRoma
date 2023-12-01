import { body } from "express-validator";

export const loginValidation = [
    body( 'email', 'Неверный формат почты' ).isEmail(),
    body( 'password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
];
export const registerValidation = [
    body( 'fio', 'Укажите имя' ).isLength({ min: 2 }),
    body( 'phone', 'Укажите номер телефона в формате 8 900 000-00-00' ).isLength({ min: 11 }),
    body( 'email', 'Неверный формат почты' ).isEmail(),
    body( 'password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
];

export const tovarCreateValidation = [
    body( 'name' ).isLength({ min: 3 }).isString(),
    body( 'price' ).isLength({ min: 1 }).isNumeric(),
    body( 'imageUrl' ).optional({nullable: true}).isURL(),
    body( 'type' ).isLength({ min: 1 }),
    body( 'categoryId' ).isLength({ min: 1 }),
];
export const categoryCreateValidation = [
    body( 'name' ).isLength({ min: 3 }).isString()
];