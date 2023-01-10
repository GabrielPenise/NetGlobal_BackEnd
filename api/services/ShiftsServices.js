const { GuardShift, Guard } = require("../models");

class ShiftsServices {
  static async getAll() {
    try {
      const response = await GuardShift.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await GuardShift.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getByGuard(guardId) {
    try {
      // comprobamos que el cliente existe
      const guard = await Guard.findByPk(guardId);

      if (!guard) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe guardia con id ${guardId}`,
          },
        };
      }

      // traemos las sucursales del cliente
      const response = await GuardShift.findAll({ where: { guardId } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createGuardShift(body) {
    try {
      // comprobamos si ya existe un turno para un día de la semana para un guardia
      // const { guardId } = body;
      // const guardShift = await GuardShift.findOne({ where: { guardId } });

      // if (guardShift) {
      //   return {
      //     error: true,
      //     data: {
      //       status: 405,
      //       message: `Ya existe un turno para el día ${day} para el guardia ${guardId}`,
      //     },
      //   };
      // }

      const response = await GuardShift.bulkCreate(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateGuardShift(id, body) {
    try {
      // comprobamos si existe el turno
      const guardShift = await GuardShift.findByPk(id);
      if (!guardShift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno-guardia con id ${id}`,
          },
        };
      }

      // actualizamos el turno
      const [affectedRows, updatedGuardShift] = await GuardShift.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedGuardShift[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async deleteGuardShift(id) {
    try {
      // comprobamos si existe el turno
      const guardShift = await GuardShift.findByPk(id);
      if (!guardShift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno con id ${id}`,
          },
        };
      }

      // eliminamos el turno
      const response = await GuardShift.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = ShiftsServices;
