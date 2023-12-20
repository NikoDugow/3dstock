const { Item } = require('../models/model');
const {Op} = require('sequelize')

const searchController = {
    async search(req, res) {
        try {
            const query = req.query.q; // Преобразуйте в нижний регистр для сравнения

            // Выполните поиск по каждой модели
            const items = await Item.findAll({ where: { name: {[Op.iLike]: `%${query}%` }}});


            // Отправьте результат клиенту
            res.json({ items });
        } catch (error) {
            console.error('Error during search:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = searchController;