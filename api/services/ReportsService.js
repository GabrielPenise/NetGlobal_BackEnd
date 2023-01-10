const { Op } = require("sequelize");
const {
  Event,
  Client,
  Branch,
  Guard,
  Shift,
  GuardShift,
} = require("../models");

class ReportsService {
  // GET EVENTS BY CLIENT
  static async reportsByType(clientId, type, start, end) {
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
      let response;
      if (type === "branches") {
        // traemos las sucursales con info de los eventos
        response = await Branch.findAll({
          where: { clientId },
          attributes: ["id", "name"],
          include: [
            {
              model: Event,
              where: { date: { [Op.between]: [start, end] } },
              include: Shift,
            },
          ],
        });
      } else {
        // traemos las sucursales con info de los eventos
        response = await Guard.findAll({
          where: { clientId },
          attributes: ["id", "name", "lastname"],
          include: [
            {
              model: Event,
              attributes: ["id", "date"],
              where: {
                date: { [Op.between]: [start, end] },
              },
              include: [
                { model: Shift, attributes: ["id", "type", "start", "end"] },
              ],
            },
          ],
        });
      }
      /* let reports = [];
      response.forEach((event, i) => {
        let obj = {};
      }); */
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = ReportsService;
