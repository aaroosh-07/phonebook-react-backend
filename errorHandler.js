const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === "CastError") {
        return res.status(500).json({ error: "wrong parameters type passed" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: "wrong data passed" });
    }
};

module.exports = errorHandler;
