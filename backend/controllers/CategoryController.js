import CategoryModel from "../models/Category.js";

export const create = async (req, res) => {
    try {

        const doc = new CategoryModel({
            name: req.body.name,
        });

        const category = await doc.save();

        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить товар',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const category = await CategoryModel.find();
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вывести товары',
        });
    }
}
  
//   // Функция получения поля сортировки
//   function getSortField(sortBy) {
//     switch (sortBy) {
//       case 'popular':
//         return '_id';
//       case 'name':
//         return 'name';
//       case 'price':
//         return 'cost';
//       default:
//         return '_id';
//     }
//   }
  
//   // Функция получения направления сортировки
//   function getSortDirection(sortOrder) {
//     return sortOrder === 'asc' ? 1 : -1;
//   }

export const getOne = async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        CategoryModel.findOne({
            _id: categoryId,
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось получить товар',
                });
            }

            if (!doc) {
               return res.status(404).json({
                message: 'Товар не найден',
               }); 
            }

            res.json(doc);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вывести товары',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        CategoryModel.findOneAndDelete({
            _id: categoryId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить товар',
                });
            }

            if (!doc) {
               return res.status(404).json({
                message: 'Товар не найден',
               }); 
            }

            res.json({
                success: true,
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить товар',
        });
    }
}

export const update = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await CategoryModel.updateOne({
            _id: categoryId,
        }, {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
        },);

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить товар',
        });
    }
}