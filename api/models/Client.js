const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Client extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Client.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    salt: {
      type: S.STRING,
    },
    cuit: {
      type: S.BIGINT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    address: {
      type: S.STRING,
      allowNull: false,
    },
    // fecha_inicio_contrato: {
    //   type: S.DATE,
    //   allowNull: true,
    // },
    // fecha_fin_contrato: {
    //   type: S.DATE,
    //   allowNull: true,
    // },
    super_admin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    first_access: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: db, modelName: "client" }
);

Client.beforeCreate((client) => {
  const salt = bcrypt.genSaltSync();
  client.salt = salt;
  return client
    .hash(client.password, salt)
    .then((hash) => (client.password = hash));
});

module.exports = Client;
