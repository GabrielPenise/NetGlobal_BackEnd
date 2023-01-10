const Client = require("./Client");
const Branch = require("./Branch");
const Guard = require("./Guard");
const Event = require("./Event");
const Shift = require("./Shift");
const GuardShift = require("./GuardShift");

Client.hasMany(Branch);
Branch.belongsTo(Client);

Client.hasMany(Guard);
Guard.belongsTo(Client);

Event.belongsTo(Branch);
Branch.hasMany(Event);
Event.belongsTo(Guard);
Guard.hasMany(Event);
Event.belongsTo(Shift);
Shift.hasMany(Event);

Guard.hasMany(GuardShift);
Shift.hasMany(GuardShift);
GuardShift.belongsTo(Guard);
GuardShift.belongsTo(Shift);

module.exports = { Branch, Guard, Client, Shift, GuardShift, Event };
