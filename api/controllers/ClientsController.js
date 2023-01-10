const ClientService = require("../services/ClientService");

const { generateToken } = require("../config/token");

class ClientsController {
  // CREATE CLIENT - REGISTER
  static async createClient(req, res) {
    const body = req.body;

    const { error, data } = await ClientService.createClient(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  //LOG IN
  static async loginClient(req, res) {
    const { email, password } = req.body;
    const { error, data } = await ClientService.loginClient(email, password);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateToken(data);
    res.cookie("token", token);
    res.send(data);
  }

  // GET ALL CLIENTS
  static async allClients(req, res) {
    const { error, data } = await ClientService.allClients();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  // GET ALL INACTIVES CLIENTS
  static async allInactivesClients(req, res) {
    const { error, data } = await ClientService.allInactivesClients();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  // GET ONE CLIENT BY ID
  static async getOneClient(req, res) {
    const { id } = req.params;
    const { error, data } = await ClientService.getOneClient(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe el cliente con id: ${id}` });
    }
    res.send(data);
  }

  // CHANGE PASSWORD

  static async changePassword(req, res) {
    const id = req.params.id;
    const { password } = req.body;
    const { error, data } = await ClientService.changePassword(id, password);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha cambiado la contraseña con éxito");
  }

  // UPDATE CLIENT

  static async updateClient(req, res) {
    const id = req.params.id;
    const body = req.body;
    const { error, data } = await ClientService.updateClient(id, body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha actualizado con éxito");
  }

  // UNSUSCRIBE - DELETE

  static async delete(req, res) {
    const id = req.params.id;
    const { error, data } = await ClientService.deleteClient(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha dado de baja al cliente");
  }

  // SUSCRIBE - RESTORE
  static async restore(req, res) {
    const id = req.params.id;
    const { error, data } = await ClientService.restoreClient(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha dado de alta al cliente");
  }
}

module.exports = ClientsController;
