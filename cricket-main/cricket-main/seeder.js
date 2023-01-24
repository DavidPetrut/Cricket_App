//seed data to mongoDB database from csv file
const path = require("path");
const Player = require("./model");
const dbConnection = require("./dbConnection");

//database connection
dbConnection();

//csv file path
const csvFilePath = path.join(__dirname, "data", "cricket.csv");
const csv = require("csvtojson");

//delete all data from database and insert new data from csv file
csv()
    .fromFile(csvFilePath)
    .then(async (jsonObj) => {
        try {
            await Player.deleteMany();
            console.log("data deleted");
            await Player.insertMany(jsonObj);
            console.log("data inserted");
        } catch (err) {
            console.log(err.message);
        }
    });
