export const lengthStdCheck = (req, res, next) => {
  const { n } = req.params;
  if (1 <= n) {
    return next();
  }

  res.status(500).json('error');
};
