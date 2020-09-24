exports.validate = function validate(scheme, reqPart = "body") {
  return (req, res, next) => {
    const validationResult = scheme.validate(req[reqPart]);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  };
};

exports.tcWrapper = function tcWrapper(f) {
  return async (req, res, next) => {
    try {
      await f(req, res);
    } catch (error) {
      next(error);
    }
  };
};
