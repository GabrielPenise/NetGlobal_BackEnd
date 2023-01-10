const { Client } = require("../models");

class ClientService {
  // CREATE CLIENT - REGISTER

  static async createClient(body) {
    try {
      const response = await Client.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // LOG IN
  static async loginClient(email, password) {
    try {
      const client = await Client.findOne({ where: { email: email } });
      if (!client)
        return {
          error: true,
          data: {
            status: 400,
            message: `No existe el cliente con email ${email}`,
          },
        };

      const validate = await client.validatePassword(password);
      if (!validate)
        return {
          error: true,
          data: {
            status: 400,
            message: `Contraseña incorrecta`,
          },
        };
      const payload = {
        id: client.id,
        name: client.name,
        cuit: client.cuit,
        email: client.email,
        super_admin: client.super_admin,
        first_access: client.first_access,
        rol: "client",
      };
      return { error: false, data: payload };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL CLIENTS
  static async allClients() {
    try {
      const response = await Client.findAll({
        where: { super_admin: false, active: true },
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL INACTIVES CLIENTS
  static async allInactivesClients() {
    try {
      const response = await Client.findAll({
        where: { super_admin: false, active: false },
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ONE CLIENT BY ID
  static async getOneClient(id) {
    try {
      const cliente = await Client.findByPk(id, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: cliente };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // CHANGE PASSWORD
  static async changePassword(id, password) {
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente ${id}`,
          },
        };
      }
      if (password.length < 6) {
        return {
          error: true,
          data: {
            status: 400,
            message: `La contraseña debe tener al menos 6 caracteres`,
          },
        };
      }
      // actualizamos la contraseña
      const hashedPassword = await client.hash(password, client.salt);
      const response = client.update({
        password: hashedPassword,
        first_access: false,
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UPDATE CLIENT
  static async updateClient(id, body) {
    try {
      const cliente = await Client.findByPk(id);
      if (!cliente) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente ${id}`,
          },
        };
      }
      // actualizamos el cliente
      const [affectedRows, updatedClient] = await Client.update(body, {
        where: { id },
        returning: true, //para que devuelva algo el update
      });
      return { error: false, data: updatedClient[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UNSUSCRIBE - DELETE

  static async deleteClient(id) {
    try {
      // comprobamos si existe la sucursal
      const client = await Client.findByPk(id);
      console.log(client);
      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente con id ${id}`,
          },
        };
      }

      const body = { active: false };
      const response = await Client.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // SUSCRIBE - RESTORE
  static async restoreClient(id) {
    try {
      // comprobamos si existe la sucursal
      const client = await Client.findByPk(id);

      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente con id ${id}`,
          },
        };
      }

      const body = { active: true };
      const response = await Client.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}
module.exports = ClientService;
