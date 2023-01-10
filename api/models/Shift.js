const S = require("sequelize");
const db = require("../config/db");

class Shift extends S.Model {}

Shift.init(
  {
    type: {
      type: S.ENUM,
      values: ["Diurno", "Vespertino", "Matutino"],
      allowNull: false,
    },
    start: {
      type: S.STRING,
      allowNull: false,
    },
    end: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shift" }
);

module.exports = Shift;
