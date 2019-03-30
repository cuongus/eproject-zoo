var express = require("express");
var app = express();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

app.use(express.static("public"));

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb+srv://root:12345A@cluster0-n5zqy.mongodb.net/data_eproject';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connected....');
        var database = db.db();
        var collection_1 = database.collection("animals");

        app.get("/list_animals",function(req,res){
            var objectParam = {};

            var idloai = req.query.idloai;

            var page = req.query.page;
            var limit = 16;

            if(idloai){
                objectParam.idloai = idloai;
            }


            var offset = 0;
            if(page){
                offset = (page - 1)*limit;
            }

            collection_1.find(objectParam).skip(offset).limit(limit).toArray(function (err, result) {
                if (err) {

                } else if (result.length) {
                    res.send(result);
                } else {
                    res.send([]);
                }

            });

            // neu muon tim 1 object
            // collection.findOne({sp_id: "P0001"}).then(result=>{
            // 	res.send(result);
            // })

        });

        app.get("/chi-tiet",function(req,res){
            var ID = parseInt(req.query.id);
            collection_1.findOne({ID: ID}).then(result=>{
                if(result) {
                    res.send(result);
                } else {
                    res.send("0");
                }

            });
        });
        // do some work here with the database.

        //  app.get('')


        //Close connection
        //db.close();
    }
});

app.listen("3333",function(){
    console.log("server is running");
});



