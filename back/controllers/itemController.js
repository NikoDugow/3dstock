const uuid = require('uuid')
const path = require('path')
const {Item, ItemInfo } = require('../models/model')
const ApiError = require('../error/ApiError')
class ItemController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info} = req.body
            const {preview, stlFile} = req.files
            let previewFileName = uuid.v4() +".jpg"
            await preview.mv(path.resolve(__dirname, '..', 'static', previewFileName))

            let stlFileName = uuid.v4() + ".stl"
            await stlFile.mv(path.resolve(__dirname, '..', 'static', stlFileName))

            const item = await  Item.create({name, price, typeId, preview: previewFileName, stlFile: stlFileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: item.id
                    })
                )
            }
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!typeId) {
            devices = await Item.findAndCountAll({limit, offset})
        }

        if (typeId) {
            devices = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne({
            where: {id},
            include: [{model: ItemInfo, as: 'info'}]
        })
        return res.json(item)
    }
    async downloadSTLFile(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({where: {id: id}});



            const filePath = path.resolve(__dirname, '..', 'static', item.stlFile);
            res.download(filePath);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

}

module.exports = new ItemController()