const {
  Event,
  Client,
  Branch,
  Guard,
  Shift,
  GuardShift,
} = require("../models");

const moment = require("moment");

class EventsService {
  // CREATE EVENT
  static async createEvent(body) {
    const { shiftId, branchId, date, guardId } = body;

    try {
      //check if dont exist other event with same shift
      const evento = await Event.findOne({
        where: { date, shiftId, branchId },
      });
      if (evento) {
        return {
          error: true,
          data: {
            status: 409,
            message: `Ya hay un guardia asignado para ese turno`,
          },
        };
      }
      //check if the guard are not busy on this date
      const guardiaOcupado = await Event.findOne({ where: { date, guardId } });
      if (guardiaOcupado) {
        return {
          error: true,
          data: {
            status: 409,
            message: `El guardia con id:${guardId} ya tiene asignado un evento el día ${date}`,
          },
        };
      }
      const day = moment(date).format("dddd");
      const turnoOcupado = await GuardShift.findOne({
        where: {
          guardId,
          shiftId,
          day,
        },
      });

      if (!turnoOcupado) {
        return {
          error: true,
          data: {
            status: 409,
            message: `Este guardia no tiene disponibilidad, en este horario.`,
          },
        };
      }

      const response = await Event.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UPDATE A EVENT

  static async updateEvent(body) {
    const { guardId, shiftId, branchId, date } = body;
    delete body.id;
    try {
      // check if the event exists
      const evento = await Event.findAll({
        where: {
          date,
          shiftId,
          branchId,
        },
      });

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento `,
          },
        };
      }

      // update the event
      const [affectedRows, updatedEvent] = await Event.update(body, {
        where: { date, shiftId, branchId },
        returning: true, //para que devuelva algo el update
      });
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // CHECKIN GUARD

  static async checkIn(id, body) {
    try {
      const { time_in, position_in_latitude, position_in_longitude } = body;
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // update the event

      const [affectedRows, updatedEvent] = await Event.update(
        { time_in, position_in_latitude, position_in_longitude },
        {
          where: { id },
          returning: true, //para que devuelva algo el update
        }
      );
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // CHECKOUT GUARD

  static async checkOut(id, body) {
    try {
      const { time_out, position_out_latitude, position_out_longitude } = body;
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // update the event

      const [affectedRows, updatedEvent] = await Event.update(
        { time_out, position_out_latitude, position_out_longitude },
        {
          where: { id },
          returning: true, //para que devuelva algo el update
        }
      );
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // DELETE A EVENT
  static async deleteEvent(body) {
    const { shiftId, guardId, branchId, date } = body;

    try {
      // check if the event exists
      const evento = await Event.findAll({
        where: { shiftId, guardId, branchId, date },
      });

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // delete the event
      const response = await Event.destroy({
        where: { shiftId, guardId, branchId, date },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET EVENT BY ID

  static async getOneEvent(id) {
    try {
      const evento = await Event.findByPk(id);
      return { error: false, data: evento };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL EVENTS BY BRANCH

  static async allEventsByBranch(branchId) {
    try {
      const response = await Event.findAll({
        where: { branchId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Guard,
            as: "guard",
            attributes: {
              exclude: ["password", "salt", "createdAt", "updatedAt"],
            },
          },
          { model: Shift, as: "shift" },
        ],
      });
      let events = [];

      response.forEach((event, i) => {
        events[i] = {
          id: event.id,
          date: event.date,
          title: `Turno ${event.guard.name} ${event.guard.lastname}`,
          start: new Date(`${event.date} ${event.shift.start}`),
          end: new Date(`${event.date} ${event.shift.end}`),
          branchId: event.branchId,
          guardId: event.guardId,
          shiftId: event.shiftId,
          nota: "",
        };
      });
      return { error: false, data: events };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL EVENTS BY GUARD

  static async allEventsByGuard(guardId) {
    try {
      const eventos = await Event.findAll({
        where: { guardId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Branch,
            as: "branch",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Guard,
            as: "guard",
            attributes: {
              exclude: ["password", "salt", "createdAt", "updatedAt"],
            },
          },
          {
            model: Shift,
            as: "shift",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      const events = eventos.map((evento) => {
        return {
          id: evento.id,
          cuil: evento.guard.cuil,
          date: evento.date,
          title: `Turno ${evento.guard.name} ${evento.guard.lastname}`,
          start: new Date(`${evento.date} ${evento.shift.start}`),
          end: new Date(`${evento.date} ${evento.shift.end}`),
          branchId: evento.branchId,
          guardId: evento.guardId,
          shiftId: evento.shiftId,
          branchName: evento.branch.name,
          branchAddress: evento.branch.fulladdress,
          mobileStart: evento.shift.start,
          mobileEnd: evento.shift.end,
        };
      });

      return { error: false, data: events };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  //GET EVENT BY GUARD ID AND DATE
  static async eventByDateYGuard(guardId, date) {
    try {
      const eventos = await Event.findAll({
        where: { guardId, date },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Branch,
            as: "branch",
          },
          { model: Shift, as: "shift" },
        ],
      });
      return { error: false, data: eventos };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET EVENTS BY CLIENT
  static async eventsByClient(clientId) {
    try {
      // comprobamos que el cliente existe
      const client = await Client.findByPk(clientId);

      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe cliente con id ${clientId}`,
          },
        };
      }

      // traemos las sucursales del cliente
      const response = await Event.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          { model: Branch, as: "branch", where: { clientId } },
          {
            model: Guard,
            as: "guard",
            attributes: {
              exclude: ["password", "salt", "createdAt", "updatedAt"],
            },
          },
          { model: Shift, as: "shift" },
        ],
      });
      let events = [];
      response.forEach((event, i) => {
        events[i] = {
          id: event.id,
          title: `Turno ${event.guard.fullname}`,
          start: moment(`${event.date} ${event.shift.start}`).toDate(),
          end: moment(`${event.date} ${event.shift.end}`).toDate(),
          branchId: event.branchId,
          guardId: event.guardId,
          nota: "nada por ahora",
          guard: event.guard,
        };
      });
      return { error: false, data: events };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = EventsService;
