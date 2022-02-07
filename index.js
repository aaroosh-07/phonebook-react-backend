const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    if (!body.name || !body.num) {
        response.status(400).end();
    }
    const person = {
        id: generateId(),
        name: body.name,
        num: body.num,
        important: body.important,
    };
    persons = persons.concat(person);
    response.json(person);
});

app.put("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const per = persons.find((p) => p.id === id);
    if (!per) {
        res.status(400).end();
    }
    const body = req.body;
    if (!body.name || !body.num) {
        res.status(400).end();
    }
    const person = {
        id: id,
        name: body.name,
        num: body.num,
        important: body.important,
    };
    persons = persons.map((p) => (p.id === id ? person : p));
    res.status(200).end();
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((p) => p.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
