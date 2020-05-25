module.exports = (pool) => (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) next(err);
    req.connection = connection;

    next();

    res.on('finish', () => req.connection.release());
  });
};
