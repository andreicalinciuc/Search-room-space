const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb");
const { ObjectId } = require("mongodb");

const config = {
    MONGO_URL: "mongodb+srv://admin:admin@cluster0-a9lh4.mongodb.net"
};
const start = async () => {
    const app = express();
    app.use(cors());
    app.use(
        bodyParser.json({
            limit: "50mb"
        })
    );

    const client = await MongoClient.connect(config.MONGO_URL,{ useNewUrlParser: true });
    const db = client.db("apartment");

    const Apartment = db.collection("Apartment");

    app.post("/add-ad", async (req, res) => {
        const {name,prenume,email,phone,title,description,rooms,address,price,file } = req.body;
       
        const apartment = await Apartment.insertOne({
            email,
            name,
            prenume,
            phone,
            title,
            description,
            rooms,
            address,
            price,
            file
        });

        return res.json({
            success: true,
            apartment: apartment.ops[0]
        });
    });

    app.listen(2690);
};

start();
