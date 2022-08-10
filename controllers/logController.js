const db = require('../models/index.js');
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "***********************",
  secretAccessKey: "****************************",
  // "region": "sa-east-1" 
}); // for simplicity. In prod, use loadConfigFromFile, or env variables

const s3 =new AWS.S3();
const LogTable = db.LogTable

const createLog = async (req, res) => {
    let info = {
        LogName: req.body.LogName,
    };
    console.log("info",info)
    const Log = await LogTable.create(info);
    res.status(200).send(Log);
    console.log(Log);

}


const getLog = async (req, res) => {

    let LogData = await LogTable.findAll({})
    res.status(200).send(LogData)

}

const getCsvDownload = async (req, res) => {
    // console.log(req.params.name)
        // LogName = req.body.LogName;
        s3.getObject(
            { Bucket: 'upload-log-files', Key: req.params.name},
            function (error, data) {
              if (error != null) {
               console.log("Error",error)
              } else {
                var file= data.Body.toString();
                // res.attachment(FileName+".csv");
                res.status(200).send(file);
              }
            }
          );
}


module.exports = {
    createLog,
    getLog,
    getCsvDownload
}
