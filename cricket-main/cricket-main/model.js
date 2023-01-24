const mongoose = require("mongoose");

//schema
const playerSchema = new mongoose.Schema(
    {
        Player_Name: {
            type: String,
            required: true,
        },
        Matches: {
            type: Number,
            required: true,
        },
        //extra field
        Inns: {
            type: Number,
        },
        Runs: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        HS: {
            //type mixed to allow string and number
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        //extra field
        Ave: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Player", playerSchema);
