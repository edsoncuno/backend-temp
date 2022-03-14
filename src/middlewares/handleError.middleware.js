const hanldeError = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.json({ severity: 'error', summary: err.name, detail: err.message });
};

module.exports = hanldeError;