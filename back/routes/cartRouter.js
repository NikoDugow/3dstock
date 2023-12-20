const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, cartController.addToCart )
router.get('/', authMiddleware, cartController.getCartUser)
router.delete('/:id', authMiddleware, cartController.removeFromCart)

module.exports = router