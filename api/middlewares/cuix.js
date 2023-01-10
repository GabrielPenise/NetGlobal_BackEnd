function validateCuix(req, res, next) {
  let cuix = req.body.cuit || req.body.cuil;
  cuix = cuix.toString();

  if (cuix.length !== 11) {
    return res
      .status(400)
      .send("El CUIT/CUIL tiene que tener al menos 11 dígitos");
  }

  const [checkDigit, ...rest] = cuix.split("").map(Number).reverse();

  const total = rest.reduce(
    (acc, cur, index) => acc + cur * (2 + (index % 6)),
    0
  );

  const mod11 = 11 - (total % 11);

  if (mod11 === 11) {
    if (checkDigit === 0) next();
    else return res.status(400).send("El CUIT/CUIL no es válido");
  }

  if (mod11 === 10) {
    return res.status(400).send("El CUIT/CUIL no es válido");
  }

  if (checkDigit === mod11) next();
  else return res.status(400).send("El CUIT/CUIL no es válido");
}

module.exports = { validateCuix };
