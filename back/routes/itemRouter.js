const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, itemController.create )
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.get('/download/:id', authMiddleware, itemController.downloadSTLFile )

module.exports = router