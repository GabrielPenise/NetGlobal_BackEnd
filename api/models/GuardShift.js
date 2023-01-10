const S = require("sequelize");
const db = require("../config/db");

class GuardShift extends S.Model {}

GuardShift.init(
  {
    day: {
      type: S.ENUM,
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "guard_shift" }
);

module.exports = GuardShift;
