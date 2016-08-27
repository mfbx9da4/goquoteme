import co from 'co';

module.exports = {
  coW(generator, ...args) {
    return (req, res, next) => {
      co(generator(req, res, ...args)).catch((err) => {
        err.functionName = generator.name; // eslint-disable-line
        next(err);
      });
    };
  },
};
