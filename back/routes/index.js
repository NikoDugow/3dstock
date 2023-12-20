const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const searchRouter = require('./searchRoutes')
const cartRouter = require('./cartRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/item', itemRouter)
router.use('/search', searchRouter)
router.use('/cart', cartRouter)

module.exports = router