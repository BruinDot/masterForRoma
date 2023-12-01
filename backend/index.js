import express  from "express";
import mongoose from 'mongoose';
import cors from "cors";
import multer from "multer";
import * as dotenv from 'dotenv'


import { registerValidation, loginValidation, tovarCreateValidation, categoryCreateValidation} from "./validations.js";
import { handleValidationErrors, checkAuth, checkAdmin } from "./utils/index.js";

import { UserController, TovarController, CategoryController, OrderController } from "./controllers/index.js";
// import { sort } from "./controllers/TovarController.js";

dotenv.config()

mongoose
    .connect(
        process.env.DB,
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

    
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, checkAdmin, upload.single('image'), (req, res) => {
    res.json({
        url: `http://127.0.0.1:5000/uploads/${req.file.originalname}`,
    });
});



app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login,  checkAuth, checkAdmin);
app.get('/admin', checkAuth, checkAdmin)
app.get('/auth/me', checkAuth, UserController.getMe);
app.patch('/auth/edit/:id', checkAuth, UserController.update);
app.get('/auth/meRole', UserController.getMeRole);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);


app.get('/tovars', TovarController.getAll);
app.get('/tovars/sort', TovarController.sort);
app.get('/tovars/search/', TovarController.search);
app.get('/tovars/:id', TovarController.getOne);
app.post('/tovars', checkAuth, checkAdmin, tovarCreateValidation, handleValidationErrors, TovarController.create);
app.delete('/tovars/:id', checkAuth, checkAdmin, TovarController.remove);
app.patch('/tovars/:id', checkAuth, checkAdmin, TovarController.update);

app.get('/categories', CategoryController.getAll);
app.get('/categories/:id', CategoryController.getOne);
app.post('/categories', checkAuth, checkAdmin, categoryCreateValidation, handleValidationErrors, CategoryController.create);
app.delete('/categories/:id', checkAuth, checkAdmin, TovarController.remove);
app.patch('/categories/:id', checkAuth, checkAdmin, TovarController.update);


app.get('/cart', )

// app.get('/orders', checkAuth, OrderControler.getOne);
app.get('/orders', checkAuth, OrderController.getAll);
app.get('/orders/my', checkAuth, OrderController.getUser);
app.post('/orders', tovarCreateValidation, OrderController.create);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK')
});
