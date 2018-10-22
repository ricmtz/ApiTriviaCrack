// FIXME A mi gusto un notFound sigue siendo un error y podrian unificarlo con el errorHandler que ya tienen

const notFound = (req, res, next) => {
    res.status(404).send();
};

module.exports = notFound;
