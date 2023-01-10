const { Shift } = require("../models");

class ShiftsServices {
  static async getAll() {
    try {
      const response = await Shift.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Shift.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createShift(body) {
    try {
      const response = await Shift.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateShift(id, body) {
    try {
      // comprobamos si existe el turno
      const shift = await Shift.findByPk(id);
      if (!shift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno con id ${id}`,
          },
        };
      }

      // actualizamos el turno
      const [affectedRows, updatedShift] = await Shift.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedShift[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async deleteShift(id) {
    try {
      // comprobamos si existe el turno
      const shift = await Shift.findByPk(id);
      if (!shift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno con id ${id}`,
          },
        };
      }

      // eliminamos el turno
      const response = await Shift.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = ShiftsServices;
