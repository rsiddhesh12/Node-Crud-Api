const uuid = require('uuid');
const CRON = require('node-cron');
const AWS = require('aws-sdk');
const axios = require('axios');
const {Parser} = require("json2csv");
const fs = require("fs");

AWS.config.update({
    accessKeyId: "AKIAZX5IKU6G4CRP6SSC",
    secretAccessKey: "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",
    // "region": "sa-east-1" 
  });
  const s3 =new AWS.S3();

//   const [userlist, setUserlist] = useState([]);

var logData = CRON.schedule('*/30 * * * *',async ()=>{
    await axios.get(`http://localhost:8080/api/v1/user/product/allProduct`)
    .then(res =>{
        // console.log("response",res.data);
        // let data =res.data
        let currentTime =Date.now();
        console.log(currentTime,"Time======>")
        const userDataLog = res.data.filter((data) => {
                let date = new Date(data.createdAt)
            return  currentTime - date.getTime() <= 1800000;
        });
        console.log("newLog",userDataLog)
        let new_logList = userDataLog.map(function(obj) {
        return {
            ProductName: obj.pname,
            Price: obj.price,
            Description: obj.description
        }
        });
        console.log("data LOG======>",new_logList);
        const json2csvParser =new Parser(); 
        const csvFile = json2csvParser.parse(new_logList);
        console.log("CSVLOg",csvFile);
        var fName="ProductLog"+uuid.v1()+".csv"
        // fs.writeFile(fName,csvFile,function(err){
        //     if(err){
        //         throw err;
        //     }
        //     console.log("File Saved");
        // });
        // console.log("counter=======>2",fileCounter);
        // var FILEPATH ="C:/Node-Express-Sequelize-React-FullStack-image-upload-master/"+fName;
        // fs.readFile(FILEPATH,'utf-8',  (err, data) => {
        //   if (err) throw err;
        //   const params = {
        //     Bucket: 'upload-log-files', 
        //     Key: fName, 
        //     Body : data
        //   };
      
        //   s3.upload(params, (s3Err, data) => {
        //     if (s3Err) throw s3Err
        //     console.log(`File uploaded successfully at ${data.Location}`)
        //   });
        // //  });
        const params = {
            Bucket: 'upload-log-files', 
            Key: fName, 
            Body : csvFile
        };
        
        s3.upload(params, (s3Err,csvFile) => {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${csvFile.Location}`)
        });
        let payload = {LogName: fName};
            axios.post('http://localhost:8080/api/v1/user/logdata/createlLog',payload)
            .then(function(response){
                // res.redirect('/product');
            });
    }).catch(err => console.log("err",err));
})
// logData.start();//scheduler for data after every 30Min