const { Guard, Branch, GuardShift, Shift } = require("../models");
const { distanceCoordinates } = require("../utils/coordinates");
const moment = require("moment");
class GuardsService {
  static async getAll() {
    try {
      const response = await Guard.findAll({
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getInactivesGuards() {
    try {
      const response = await Guard.findAll({
        where: { active: false },
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getGuardsByClient(clientId) {
    try {
      const response = await Guard.findAll({
        where: { clientId, active: true },
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getByDistance(branchId, date, shiftId) {
    const newDate = moment(date).format("dddd");

    try {
      // comprobamos que la branch existe
      const branch = await Branch.findByPk(branchId);

      if (!branch) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe sucursal con id ${branchId}`,
          },
        };
      }

      // traemos los guardias del cliente al que pertenece esa sucursal
      const guards = await Guard.findAll({
        where: { clientId: branch.clientId, active: true },
        include: {
          model: GuardShift,
          where: {
            day: newDate,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "guardId", "shiftId"],
          },
          include: {
            model: Shift,
            where: {
              id: shiftId,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        },
        attributes: {
          exclude: ["password", "salt", "createdAt", "updatedAt"],
        },
      });

      // filtramos guardias que se encuentran como máxim a 50km de la sucursal
      const response = guards.filter(
        (guard) =>
          distanceCoordinates(
            guard.latitude,
            guard.longitude,
            branch.latitude,
            branch.longitude
          ) <= process.env.DISTANCE_TO_BRANCH
      );

      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Guard.findByPk(id, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createGuard(body) {
    try {
      const response = await Guard.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async loginGuard(email, password) {
    try {
      const guard = await Guard.findOne({ where: { email } });
      if (!guard)
        return {
          error: true,
          data: {
            status: 400,
            message: `No existe el guardia con email ${email}`,
          },
        };
      const validate = await guard.validatePassword(password);
      if (!validate)
        return {
          error: true,
          data: {
            status: 400,
            message: `Contraseña incorrecta`,
          },
        };
      const payload = {
        id: guard.id,
        email: guard.email,
        fullname: guard.fullname,
        rol: "guard",
        first_access: guard.first_access,
      };
      return { error: false, data: payload };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async changePassword(id, password) {
    try {
      const guard = await Guard.findByPk(id);
      if (!guard) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente ${id}`,
          },
        };
      }
      // actualizamos la contraseña
      const hashedPassword = await guard.hash(password, client.salt);
      const response = guard.update({
        password: hashedPassword,
        first_access: false,
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateGuard(id, body) {
    try {
      const guard = await Guard.findByPk(id);
      if (!guard) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el guardia con id ${id}`,
          },
        };
      }
      console.log("before update", guard);
      const updatedGuard = await guard.update(body);
      console.log("after update", updatedGuard);
      return { error: false, data: updatedGuard };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async deleteGuard(id) {
    try {
      const resp = await Guard.findByPk(id);
      if (!resp) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el guardia con el id ${id}`,
          },
        };
      }
      const body = { active: false };
      const response = await Guard.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async restoreGuard(id) {
    try {
      const resp = await Guard.findByPk(id);
      if (!resp) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el guardia con el id ${id}`,
          },
        };
      }
      const body = { active: true };
      const response = await Guard.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }
}

module.exports = GuardsService;
