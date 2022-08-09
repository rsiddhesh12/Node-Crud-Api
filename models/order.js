
module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Orders", {
        oid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id: {
            type: DataTypes.INTEGER,
        },
        OrderName: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE, 
        },
    })

    return Order

}