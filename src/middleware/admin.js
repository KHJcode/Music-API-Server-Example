export const adminCheck = (req, res, next) => {
  const { key } = req.body;
  
  if (key === process.env.ADMIN_KEY) {
    return next();
  }
  res.status(401).json("permission denied.");
};

export const weatherUserIdCheck = (req, res, next) => {
  const { id } = req.params;
  const userkey = ['ZEhWeVltOD0', 'VXpCb1Mxa3lPV3RhVVQwOQ'];

  if (userkey.includes(id)) {
    return next();
  }
  res.status(401).json("permission denied.");
};
