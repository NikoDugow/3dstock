const { Item, CartItem, Cart } = require("../models/model")

class CartController {
    // ------ CRUD корзины ------ //

    async addToCart(req,res,next){
        const user = req.user
        const {itemId } = req.body
        const cart = await CartItem.create({cartId : user.id, itemId : itemId})
        return res.json(cart)
    }

    async getCartUser(req,res){
        const {id} = req.user
        const cart = await CartItem.findAll({include: {
                model: Item
            }, where: {cartId: id}})

        return res.json(cart)
    }
    async removeFromCart(req, res) {
        try{
            const {id} = req.params
            const removedItem = await CartItem.destroy({where: {itemId:id}})
            if (removedItem){
                return res.json({success: true})
            }
        }catch (e) {
            return res.status(404).json({error:'Предмет не найден'})

        }
    }

}

module.exports = new CartController()
