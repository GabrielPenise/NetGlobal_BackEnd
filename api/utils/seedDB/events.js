const { Event } = require("../../models");

const events = [
  {
    date: "2022-12-07",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2022-12-08",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2022-12-09",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2022-12-10",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2022-12-11",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2022-12-12",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2022-12-07",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2022-12-08",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2022-12-09",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2022-12-10",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2022-12-11",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2022-12-12",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2022-12-07",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2022-12-08",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2022-12-09",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2022-12-10",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2022-12-11",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-12",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-08",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-09",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-12",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-10",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-11",
    guardId: 3,
    shiftId: 2,
    branchId: 5,
  }
];

async function createEvents() {
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    await Event.create(event);
  }
  console.log("EVENTS created ok");
}

module.exports = createEvents;
