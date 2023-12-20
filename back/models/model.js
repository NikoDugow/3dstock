const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define( 'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Item = sequelize.define( 'item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.INTEGER, allowNull: true},
    preview: {type: DataTypes.STRING, allowNull: false},
    stlFile: {type: DataTypes.STRING, allowNull: false}
})

const Cart = sequelize.define( 'cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const CartItem = sequelize.define( 'cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const FavouritesList = sequelize.define( 'fav_list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const FavItem = sequelize.define( 'fav_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Type = sequelize.define( 'type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define( 'rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, unique: false, allowNull: false},
})

const ItemInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasOne(FavouritesList)
FavouritesList.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

FavouritesList.hasMany(FavItem)
FavItem.belongsTo(FavouritesList)

Type.hasMany(Item)
Item.belongsTo(Type)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(CartItem)
CartItem.belongsTo(Item)

Item.hasMany(FavItem)
FavItem.belongsTo(Item)

Item.hasMany(ItemInfo, {as: 'info'});
ItemInfo.belongsTo(Item)

module.exports = {
    User,
    Cart,
    FavouritesList,
    Item,
    Rating,
    Type,
    CartItem,
    FavItem,
    ItemInfo
}