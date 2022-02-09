require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.URL;

mongoose
    .connect(url)
    .then((result) => {
        console.log("sucessfully connected to the database");
    })
    .catch((error) => {
        console.log("error occured", error.message);
    });

const schema = new mongoose.Schema({
    name: String,
    num: String,
    important: Boolean,
});

schema.set("toJSON", {
    transform: (document, returnedobject) => {
        returnedobject.id = returnedobject._id.toString();
        delete returnedobject._id;
        delete returnedobject.__v;
    },
});

const Person = mongoose.model("Person", schema);

module.exports = Person;
