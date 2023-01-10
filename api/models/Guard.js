const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { getCoordinates } = require("../utils/coordinates");

class Guard extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Guard.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    cuil: {
      type: S.BIGINT,
      unique: true,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: { min: 6 },
    },
    salt: {
      type: S.STRING,
    },
    street: {
      type: S.STRING,
      allowNull: false,
    },
    number: {
      type: S.INTEGER,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    province: {
      type: S.STRING,
      allowNull: false,
    },
    postalcode: {
      type: S.STRING,
      allowNull: false,
    },
    latitude: {
      type: S.FLOAT,
    },
    longitude: {
      type: S.FLOAT,
    },
    hours_per_day: {
      type: S.INTEGER,
      defaultValue: 8,
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    first_access: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    fulladdress: {
      type: S.VIRTUAL,
      get() {
        return `${this.street}, ${this.number}, ${this.city}, ${this.province}, ${this.postalcode}`;
      },
    },
    fullname: {
      type: S.VIRTUAL,
      get() {
        return `${this.name} ${this.lastname}`;
      },
    },
    coordinates: {
      type: S.VIRTUAL,
      get() {
        return `${this.latitude}, ${this.longitude}`;
      },
    },
  },
  { sequelize: db, modelName: "guards" }
);

Guard.beforeCreate(async (guard) => {
  const salt = bcrypt.genSaltSync();
  guard.salt = salt;
  await guard
    .hash(guard.password, salt)
    .then((hash) => (guard.password = hash));

  const [lat, long] = await getCoordinates(
    `${guard.street} ${guard.number}`,
    guard.city,
    guard.province,
    guard.postalcode
  );

  if (lat && long) {
    guard.latitude = lat;
    guard.longitude = long;
  } else throw new Error("No se encuentran coordenadas para esa dirección");
});

Guard.beforeUpdate(async (guard) => {
  const [lat, long] = await getCoordinates(
    `${guard.street} ${guard.number}`,
    guard.city,
    guard.province,
    guard.postalcode
  );

  if (lat && long) {
    guard.latitude = lat;
    guard.longitude = long;
  } else throw new Error("No se encuentran coordenadas para esa dirección");
});

module.exports = Guard;
