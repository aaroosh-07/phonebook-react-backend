const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const person = require("./models/mongodb.js");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        num: "040-123456",
        important: false,
    },
    {
        id: 2,
        name: "Ada Lovelace",
        num: "39-44-5323523",
        important: false,
    },
    {
        id: 3,
        name: "Dan Abramov",
        num: "12-43-234345",
        important: false,
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        num: "39-23-6423122",
        important: false,
    },
];

const generateId = () => {
    const maxId = Math.max(...persons.map((a) => a.id));
    return maxId + 1;
};

app.get("/api/persons", (request, response) => {
    person
        .find({})
        .then((notes) => {
            console.log("inside of sending back notes..", notes);
            response.json(notes);
        })
        .catch((error) => {
            console.log("error occured in fetching ", error.message);
        });
});

app.get("/api/persons/:id", (request, response) => {
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
            console.log("some error occured", error);
            response.status(400).json({ error: "some error occured" });
        });
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.num) {
        response.status(400).end();
    }

    const record = person({
        name: body.name,
        num: body.num,
        important: body.important,
    });

    record.save().then((savedRecord) => {
        response.json(savedRecord);
    });
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
