const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const person = require("./models/mongodb.js");
const errorHandler = require("./errorHandler.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/persons", (request, response, next) => {
    person
        .find({})
        .then((notes) => {
            console.log("inside of sending back notes..", notes);
            response.json(notes);
        })
        .catch((error) => {
            next(error);
        });
});

app.get("/api/persons/:id", (request, response, next) => {
    person
        .findById(request.params.id)
        .then((record) => {
            if (record) {
                response.json(record);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    const record = person({
        name: body.name,
        num: body.num,
        important: body.important,
    });

    record
        .save()
        .then((savedRecord) => {
            response.json(savedRecord);
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res) => {
    const body = req.body;
    if (!body.name || !body.num) {
        res.status(400).end();
    }
    const record = {
        name: body.name,
        num: body.num,
        important: body.important,
    };
    person
        .findByIdAndUpdate(req.params.id, record, { new: true })
        .then((updatedRecord) => {
            res.json(updatedRecord);
        })
        .catch((error) => {
            console.log("some error occured", error);
            res.status(400).end();
        });
});

app.delete("/api/persons/:id", (request, response) => {
    person
        .findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => {
            console.log("some error has occured", error);
            response.status(204).end();
        });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.use(errorHandler);
