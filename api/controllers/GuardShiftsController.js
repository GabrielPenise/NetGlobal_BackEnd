const GuardShiftsServices = require("../services/GuardShiftsServices");

class GuardShiftsController {
  static async getAll(req, res) {
    const { error, data } = await GuardShiftsServices.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardShiftsServices.getSingle(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe un turno-guardia con id ${id}` });
    }

    res.send(data);
  }

  static async getByGuard(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardShiftsServices.getByGuard(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.send(data);
  }

  static async createShift(req, res) {
    const body = req.body;
    const { error, data } = await GuardShiftsServices.createGuardShift(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async updateShift(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await GuardShiftsServices.updateGuardShift(
      id,
      body
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(202).send(data);
  }

  static async deleteShift(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardShiftsServices.deleteGuardShift(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.sendStatus(202);
  }
}

module.exports = GuardShiftsController;
