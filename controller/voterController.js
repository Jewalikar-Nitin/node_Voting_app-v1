const voterModel = require("../models/voterModel");
const { generateToken } = require("../jwt");
const { Error } = require("mongoose");

async function signUp(req, res) {
    try {
        let data = req.body;
        let voter = new voterModel(data);
        const response = await voter.save();
        console.log("voter created", response);
        let payload = {
            id: response.id,
            name: response.name,
        };
        const token = await generateToken(payload);
        return res.status(200).send(token);
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal server Error" });
    }
}

async function login(req, res) {
    let data = req.body;
    try {
        let voter = await voterModel.findOne({
            aadharNumber: data.aadharNumber,
        });
        if (!voter) {
            res.status(200).json({ messge: "Voter not found" });
        } else if (voter && !(await voter.comparePassword(data.password))) {
            res.status(400).json({ messge: "Id or Password does not match" });
        } else {
            let payload = {
                id: voter.id,
                name: voter.name,
            };
            res.status(200).json({
                token: await generateToken(payload),
                message: "ok",
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function voterProfile(req, res) {
    try {
        let user = req.user;
        const voter = await voterModel.findById(user.id);
        res.status(200).send(voter);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { signUp, login, voterProfile };
