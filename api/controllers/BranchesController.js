const BranchesService = require("../services/BranchesService");

class BranchesController {
  static async getAll(req, res) {
    const { error, data } = await BranchesService.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getInactives(req, res) {
    const { error, data } = await BranchesService.getInactives();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;

    const { error, data } = await BranchesService.getSingle(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe la branch con id ${id}` });
    }
    res.send(data);
  }

  static async getClientBranches(req, res) {
    const { id } = req.params;

    const { error, data } = await BranchesService.getClientBranches(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async createBranch(req, res) {
    const body = req.body;

    const { error, data } = await BranchesService.createBranch(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  static async updateBranch(req, res) {
    const { id } = req.params;
    const body = req.body;

    const { error, data } = await BranchesService.updateBranch(id, body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }

  static async deleteBranch(req, res) {
    const { id } = req.params;

    const { error, data } = await BranchesService.deleteBranch(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }

  static async restoreBranch(req, res) {
    const { id } = req.params;

    const { error, data } = await BranchesService.restoreBranch(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }
}

module.exports = BranchesController;
