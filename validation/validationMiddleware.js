const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ message: "You are missing field." + message });
    }
  };
};
module.exports = validationMiddleware;
