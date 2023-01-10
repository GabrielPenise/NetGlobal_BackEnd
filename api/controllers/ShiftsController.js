const ShiftsServices = require("../services/ShiftsServices");

class ShiftsController {
  static async getAll(req, res) {
    const { error, data } = await ShiftsServices.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await ShiftsServices.getSingle(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe un turno con id ${id}` });
    }

    res.send(data);
  }

  static async createShift(req, res) {
    const body = req.body;
    const { error, data } = await ShiftsServices.createShift(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async updateShift(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await ShiftsServices.updateShift(id, body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(202).send(data);
  }

  static async deleteShift(req, res) {
    const { id } = req.params;
    const { error, data } = await ShiftsServices.deleteShift(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.sendStatus(202);
  }
}

module.exports = ShiftsController;
