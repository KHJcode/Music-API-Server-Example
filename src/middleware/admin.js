export const adminCheck = (req, res, next) => {
  const { key } = req.body;
  if (key === process.env.ADMIN_KEY) {
    return next();
  }
  res.status(401).json("permission denied.");
};
