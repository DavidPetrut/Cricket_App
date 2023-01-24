const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection");
const Player = require("./model");

const app = express();

//external middlewares
app.use(cors());
dotenv.config();

//Internal middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//server init
dbConnection();

//routes

//create player
app.post("/api/player", async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json({
            message: "Player created successfully",
            player,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

//update player
app.post("/api/update-player/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const player = await Player.findOneAndUpdate({ Player_Name: name }, req.body, {
            new: true,
        });
        if (!player) {
            return res.status(400).json({
                message: "Player not found",
            });
        }
        res.status(201).json({
            message: "Player updated successfully",
            player,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

//get all players
app.get("/api/players", async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json({
            message: "Players fetched successfully",
            players,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

//get player by name
app.get("/api/player/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const player = await Player.findOne({
            Player_Name: name,
        });

        if (!player) {
            return res.status(400).json({
                message: "Player not found",
            });
        }

        res.status(200).json({
            message: "Player fetched successfully",
            player,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

//delete player by Player_Name
app.post("/api/delete-player", async (req, res) => {
    const { Player_Name } = req.body;
    try {
        const player = await Player.findOneAndDelete({
            Player_Name,
        });
        if (!player) {
            return res.status(400).json({
                message: "Player not found",
            });
        }
        res.status(200).json({
            message: "Player deleted successfully",
            player,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});
//get players by greater than mathces
app.get("/api/players/matches/:matches", async (req, res) => {
    const { matches } = req.params;
    try {
        const players = await Player.find({
            Matches: { $gt: matches },
        })
            .limit(20)
            .sort({ Matches: -1 });
        res.status(200).json({
            message: "Players fetched successfully",
            players,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

//get players by greater than HS
app.get("/api/players/hs/:hs", async (req, res) => {
    const { hs } = req.params;
    try {
        const players = await Player.find({});

        const filteredPlayers = players.filter((player) => {
            const playerHS = player.HS.split("*")[0];
            return Number(playerHS) > hs;
        });

        //sort by HS
        filteredPlayers.sort((a, b) => {
            const aHS = a.HS.split("*")[0];
            const bHS = b.HS.split("*")[0];
            return bHS - aHS;
        });

        res.status(200).json({
            message: "Players fetched successfully",
            players: filteredPlayers,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("APP is running in development env..");
    });
}

// --------------------------deployment------------------------------

//bad request
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Page not found",
    });
});

// listing to the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
