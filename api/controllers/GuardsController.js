const GuardsService = require("../services/GuardsService");

const { generateToken } = require("../config/token");
const { generatePassword } = require("../utils/password");

class GuardsController {
  static async getAll(req, res) {
    const { error, data } = await GuardsService.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getInactivesGuards(req, res) {
    const { error, data } = await GuardsService.getInactivesGuards();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getGuardsByClient(req, res) {
    const { id } = req.params;

    const { error, data } = await GuardsService.getGuardsByClient(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getByDistance(req, res) {
    const { branchId, date, shiftId } = req.params;
    const { error, data } = await GuardsService.getByDistance(
      branchId,
      date,
      shiftId
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardsService.getSingle(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe el guard con id ${id}` });
    }
    res.send(data);
  }

  static async createGuard(req, res) {
    const body = req.body;
    body.password = generatePassword();
    const { error, data } = await GuardsService.createGuard(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async loginGuard(req, res) {
    const { email, password } = req.body;
    const { error, data } = await GuardsService.loginGuard(email, password);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateToken(data);
    res.cookie("token", token);
    res.send(data);
  }

  static async changePassword(req, res) {
    const id = req.params.id;
    const { password } = req.body;
    const { error, data } = await GuardService.changePassword(id, password);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha cambiado la contraseña con éxito");
  }
  static async updateGuard(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await GuardsService.updateGuard(id, body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Actualizado correctamente");
  }

  static async deleteGuard(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardsService.deleteGuard(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Eliminado correctamente");
  }

  static async restoreGuard(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardsService.restoreGuard(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Restaurado correctamente");
  }
}

module.exports = GuardsController;
