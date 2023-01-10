const { Shift } = require("../../models");

const shifts = [
  {
    type: "Matutino",
    start: "00:00:00",
    end: "08:00:00",
  },
  {
    type: "Diurno",
    start: "08:00:00",
    end: "16:00:00",
  },
  {
    type: "Vespertino",
    start: "16:00:00",
    end: "00:00:00",
  },
];

async function createShifts() {
  Shift.bulkCreate(shifts).then(() => {
    console.log("SHIFTS created ok");
  });
}

module.exports = createShifts;
