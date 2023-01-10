const { Client } = require("../../models");

const clients = [
  {
    email: "admin@admin.com",
    password: "123456",
    cuit: 0,
    name: "SUPER ADMINISTRADOR",
    address: "",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    super_admin: true,
    first_access: false,
  },
  {
    email: "empresasupercoto@gmail.com",
    password: "123456",
    cuit: 30548083156,
    name: "COTO  C.I.C.S.A ",
    address: "Paysandú 1842, Buenos Aires, Argentina",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    active: true,
    first_access: false,
  },
  {
    email: "fravega@fravega.com",
    password: "123456",
    cuit: 30526874249,
    name: "Fravega S.A.",
    address: "Belgrano, 234, CABA, Buenos Aires",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    active: false,
    first_access: false,
  },
  {
    email: "musimundo@musimundo.com",
    password: "123456",
    cuit: 30697260532,
    name: "Musimundo",
    address: "Santa Fe 123, CABA, Buenos Aires",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    active: true,
    first_access: false,
  },
];

async function createClients() {
  for (let i = 0; i < clients.length; i++) {
    let client = clients[i];
    await Client.create(client);
  }
  console.log("CLIENTS created ok");
}

module.exports = createClients;
