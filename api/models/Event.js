const S = require("sequelize");
const db = require("../config/db");

class Event extends S.Model {}

Event.init(
  {
    date: {
      type: S.DATEONLY,
      allowNull: false,
    },
    time_in: {
      type: S.DATE,
    },
    position_in_latitude: {
      type: S.FLOAT,
    },
    position_in_longitude: {
      type: S.FLOAT,
    },
    time_out: {
      type: S.DATE,
    },
    position_out_latitude: {
      type: S.FLOAT,
    },
    position_out_longitude: {
      type: S.FLOAT,
    },
  },
  { sequelize: db, modelName: "events" }
);

module.exports = Event;
