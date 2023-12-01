import { query } from "express";
import TovarModel from "../models/Tovar.js";

export const create = async (req, res) => {
    try {

        const doc = new TovarModel({
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            type: req.body.type,
            categoryId: req.body.categoryId,
        });

        const tovar = await doc.save();

        res.json(tovar);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить товар',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const tovars = await TovarModel.find();
        res.json(tovars);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вывести товары',
        });
    }
}

export const sort = async (req, res, next) => {
    try {
    //   const byPriceUp = await TovarModel.find().sort({cost: 1});
    //   const byPriceDown = await TovarModel.find().sort({cost: -1});
    //   const byTovars = await TovarModel.find().sort({name: 1});
    //   res.json(byPriceUp || byPriceDown || byTovars)
      const sortType = req.query.sortBy;
      if (sortType == 'byPriceUp') {
        const byPriceUp = await TovarModel.find().sort({price: 1});
        res.json(byPriceUp) 
      } else if (sortType == 'byPriceDown') {
        const byPriceDown = await TovarModel.find().sort({price: -1});
        res.json(byPriceDown) 
      } else if (sortType === 'byTovars') {
        const byTovars = await TovarModel.find().sort({name: 1});
        res.json(byTovars) 
      }
      next
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось отсортировать товары',
      });
    }
  }

export const search = async (req, res, next) => {
    try {
    //   const byPriceUp = await TovarModel.find().sort({cost: 1});
    //   const byPriceDown = await TovarModel.find().sort({cost: -1});
    //   const byTovars = await TovarModel.find().sort({name: 1});
    //   res.json(byPriceUp || byPriceDown || byTovars)
      const searchType = req.query.query;
      if (searchType) {
        // let searchT = toString(searchType)
        const query = await TovarModel.find({name: {$regex: searchType, $options: 'i'}});
        res.json(query)
      }
      next
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось отсортировать товары',
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
        const tovarId = req.params.id;
        
        TovarModel.findOne({
            _id: tovarId,
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
        const tovarId = req.params.id;
        
        TovarModel.findOneAndDelete({
            _id: tovarId,
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
        const tovarId = req.params.id;

        await TovarModel.updateOne({
            _id: tovarId,
        }, {
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            videocard: req.body.videocard,
            processor: req.body.processor,
            ram: req.body.ram,
            motherboard: req.body.motherboard,
            power_block: req.body.power_block,
            hdd: req.body.hdd,
            ssd: req.body.ssd,
            pcCase: req.body.case,
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