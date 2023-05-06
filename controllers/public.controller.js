const publicService = require("../services/public.service");

module.exports= {
  async getAllCars(req, res) {
    const resp= await publicService.getAllCars()

    return res.status(resp.code).json(resp.data)
  },
}