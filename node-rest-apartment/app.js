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

    const client = await MongoClient.connect(config.MONGO_URL);
    const db = client.db("quiz");

    const Participants = db.collection("Participants");
    const Questions = db.collection("Questions");

    app.post("/users/register", async (req, res) => {
        const { email, name } = req.body;

        const checkUser = await Participants.findOne({ email });

        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const user = await Participants.insert({
            email,
            name
        });

        return res.json({
            success: true,
            user: user.ops[0]
        });
    });

    app.listen(2690);
};

start();
