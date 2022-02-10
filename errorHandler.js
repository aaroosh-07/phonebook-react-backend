const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === "CastError") {
        res.status(500).json({ error: "wrong parameters type passed" });
    }
};

module.exports = errorHandler;
