const { GuardShift } = require("../../models");

const guardshifts = [
  //Guard 1
  {
    day: "Monday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 1,
    shiftId: 1,
  },
  //guard 2
  {
    day: "Monday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 2,
    shiftId: 1,
  },
  //Guard 3
  {
    day: "Monday",
    guardId: 3,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 3,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 3,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 3,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 3,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 3,
    shiftId: 3,
  },
  //Guard 4
  {
    day: "Monday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Tuesday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 4,
    shiftId: 2,
  },
  //Guard 5
  {
    day: "Monday",
    guardId: 5,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 5,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 5,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 5,
    shiftId: 3,
  },
  {
    day: "Friday",
    guardId: 5,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 5,
    shiftId: 3,
  },
  //Guard 6
  {
    day: "Monday",
    guardId: 6,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 6,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 6,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 6,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 6,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 6,
    shiftId: 2,
  },
  //Guard 7
  {
    day: "Monday",
    guardId: 7,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 7,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 7,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 7,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 7,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 7,
    shiftId: 1,
  },
  // Guard 8
  {
    day: "Monday",
    guardId: 8,
    shiftId: 2,
  },
  {
    day: "Tuesday",
    guardId: 8,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 8,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 8,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 8,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 8,
    shiftId: 2,
  },
  //Guard  9
  {
    day: "Monday",
    guardId: 9,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 9,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 9,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 9,
    shiftId: 3,
  },
  {
    day: "Friday",
    guardId: 9,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 9,
    shiftId: 3,
  },

  // Guard 10
  {
    day: "Monday",
    guardId: 10,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 10,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 10,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 10,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 10,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 10,
    shiftId: 1,
  },
  // Guard 11
  {
    day: "Monday",
    guardId: 11,
    shiftId: 2,
  },
  {
    day: "Tuesday",
    guardId: 11,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 11,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 11,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 11,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 11,
    shiftId: 2,
  },
  // Guard 12
  {
    day: "Monday",
    guardId: 12,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 12,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 12,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 12,
    shiftId: 3,
  },
  {
    day: "Friday",
    guardId: 12,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 12,
    shiftId: 3,
  },
  // Guard 13
  {
    day: "Monday",
    guardId: 13,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 13,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 13,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 13,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 13,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 13,
    shiftId: 1,
  },
  // Guard 14
  {
    day: "Monday",
    guardId: 14,
    shiftId: 2,
  },
  {
    day: "Tuesday",
    guardId: 14,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 14,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 14,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 14,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 14,
    shiftId: 3,
  },
  // Guard 15
  {
    day: "Monday",
    guardId: 15,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 15,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 15,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 15,
    shiftId: 3,
  },
  {
    day: "Friday",
    guardId: 15,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 15,
    shiftId: 2,
  },
  // Guard 16
  {
    day: "Monday",
    guardId: 16,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 16,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 16,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 16,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 16,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 16,
    shiftId: 3,
  },
  // Guard 17
  {
    day: "Monday",
    guardId: 17,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 17,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 17,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 17,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 17,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 17,
    shiftId: 1,
  },
  // // Guard 18 MESSI
  // {
  //   day: "Monday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
  // {
  //   day: "Tuesday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
  // {
  //   day: "Wednesday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
  // {
  //   day: "Thursday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
  // {
  //   day: "Friday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
  // {
  //   day: "Saturday",
  //   guardId: 18,
  //   shiftId: 3,
  // },
];

async function createGuardShifts() {
  GuardShift.bulkCreate(guardshifts).then(() => {
    console.log("GUARD SHIFTS created ok");
  });
}

module.exports = createGuardShifts;
