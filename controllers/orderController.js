const db = require('../models/index.js');


const Order = db.Order

const createOrder = async (req, res) => {
    let info = {
        id: req.body.id,
        pid: req.body.pid,
        OrderName: req.body.OrderName,
    };
    console.log("info",info)
    const order= await Order.create(info);
    res.status(200).send(order);
    console.log(order);

}

const createLog = async (req, res) => {
    let info = {
        LogName: req.body.LogName,
    };
    console.log("info",info)
    const Log = await LogTable.create(info);
    res.status(200).send(Log);
    console.log(Log);

}

const getOrderData = async (req, res) => {

    let orderData = await Order.findAll({})
    res.status(200).send(orderData)

}


module.exports = {
    createOrder,
    getOrderData
}