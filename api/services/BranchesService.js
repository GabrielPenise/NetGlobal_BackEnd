const { Branch, Client } = require("../models");

class BranchesService {
  static async getAll() {
    try {
      const response = await Branch.findAll({ where: { active: true } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getInactives() {
    try {
      const response = await Branch.findAll({ where: { active: false } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Branch.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getClientBranches(clientId) {
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
      const response = await Branch.findAll({
        where: { clientId, active: true },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createBranch(body) {
    try {
      const { street, number, city, province, postalcode } = body;

      // comprobamos que no exista una sucursal con la misma geolocalización
      const branch = await Branch.findOne({
        where: { street, number, city, province, postalcode },
      });

      if (branch) {
        return {
          error: true,
          data: {
            status: 405,
            message: `Ya existe una sucursal con la misma localización`,
          },
        };
      }

      // creamos la sucursal
      const response = await Branch.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateBranch(id, body) {
    try {
      // comprobamos si existe la sucursal
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe la sucursal con id ${id}`,
          },
        };
      }

      // actualizamos la sucursal
      const updatedBranch = await branch.update(body);
      return { error: false, data: updatedBranch };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async deleteBranch(id) {
    try {
      // comprobamos si existe la sucursal
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe la sucursal con id ${id}`,
          },
        };
      }

      // eliminamos ("soft delete") la sucursal
      const body = { active: false };
      const response = await Branch.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async restoreBranch(id) {
    try {
      // comprobamos si existe la sucursal
      const branch = await Branch.findByPk(id);

      if (!branch) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe la sucursal con id ${id}`,
          },
        };
      }

      // restauramos ("soft delete") la sucursal
      const body = { active: true };
      const response = await Branch.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = BranchesService;
