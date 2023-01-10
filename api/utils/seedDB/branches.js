const { Branch } = require("../../models");

const branches = [
  // De COTO
  {
    name: "Sucursal Venezuela-Rosario",
    street: "Venezuela",
    number: 114,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2008",
    clientId: 2,
  },
  {
    name: "Sucursal Alto Rosario Shopping",
    street: "Junin",
    number: 398,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2013",
    clientId: 2,
  },
  {
    name: "Sucursal 3 de Febrero-Rosario",
    street: "3 de Febrero",
    number: 1602,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    clientId: 2,
  },
  {
    name: "Sucursal Mendoza-Rosario",
    street: "Mendoza",
    number: 3901,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    clientId: 2,
  },
  {
    name: "Sucursal Centro-Rosario",
    street: "Urquiza",
    number: 1644,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    clientId: 2,
  },
  {
    name: "Sucursal Rivadavia-Santa Fe",
    street: "Rivadavia",
    number: 3396,
    city: "Santa Fe",
    province: "Santa Fe",
    postalcode: "S3000",
    clientId: 2,
  },
  {
    name: "Sucursal Villa Crespo-CABA",
    street: "Murillo",
    number: 551,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1414",
    clientId: 2,
  },
  {
    name: "Sucursal Liniers-CABA",
    street: "Rivadavia",
    number: 9840,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1407",
    clientId: 2,
  },
  {
    name: "Sucursal Devoto-CABA",
    street: "Sanabria",
    number: 3320,
    city: "CABA",
    province: "Ciudad Autonoma de Buenos Aires",
    postalcode: "C1417",
    clientId: 2,
  },
  {
    name: "Sucursal Castelar-BsAs",
    street: "Santa Rosa",
    number: 1753,
    city: "Castelar",
    province: "Provincia de Buenos Aires",
    postalcode: "B1712",
    clientId: 2,
  },
  {
    name: "Sucursal San Martin-BsAs",
    street: "Ricardo Balbin",
    number: 2030,
    city: "San Martin",
    province: "Provincia de Buenos Aires",
    postalcode: "B1650",
    clientId: 2,
  },
  {
    name: "Suc. Cabildo",
    street: "Av. Cabildo",
    number: 2349,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1428",
    clientId: 3,
  },
  {
    name: "Suc. Santa Fe",
    street: "Av. Santa Fe",
    number: 1860,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1123",
    clientId: 3,
  },
  {
    name: "Sucursal San Nicolas-BsAs",
    street: "Avenida Alberdi",
    number: 361,
    city: "San Nicolas",
    province: "Buenos Aires",
    postalcode: "B2900",
    clientId: 2,
  },
  {
    name: "Suc. Luján",
    street: "Avenida Lorenzo Casey",
    number: 1090,
    city: "Luján",
    province: "Buenos Aires",
    postalcode: "B6700",
    clientId: 4,
    active: false,
  },
];

async function createBranches() {
  for (let i = 0; i < branches.length; i++) {
    let branch = branches[i];
    await Branch.create(branch);
  }
  console.log("BRANCHES created ok");
}

module.exports = createBranches;
