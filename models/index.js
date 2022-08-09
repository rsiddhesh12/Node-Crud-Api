const dbConfig = require('../config/dbConfig.js');
const cron = require('../controllers/cron.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize

db.User = require('./userModel.js')(sequelize, DataTypes)
db.Product = require('./productModel.js')(sequelize, DataTypes)
db.LogTable =require('./logTable.js')(sequelize, DataTypes)
db.Order = require('./order.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.User.hasMany(db.Order,{
    foreignKey: 'id',
    as:'Order'
})

db.Order.belongsTo(db.User,{
    foreignKey: 'id',
    as:'User'
});



module.exports = db