const { validateToken } = require("../config/token");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

function validateClient(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  if (user.rol !== "client" || user.super_admin) return res.sendStatus(401);

  req.user = user;

  next();
}

function validateSuperAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  if (!user.super_admin) return res.sendStatus(401);

  req.user = user;

  next();
}

module.exports = { validateAuth, validateClient, validateSuperAdmin };
