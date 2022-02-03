const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        num: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        num: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        num: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        num: "39-23-6423122",
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
    };
    persons = persons.concat(person);
    response.json(person);
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
