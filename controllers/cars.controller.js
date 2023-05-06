const carsService = require("../services/cars.service");

module.exports= {
  async getAll(req, res) {
    const resp= await carsService.getAll()

    return res.status(resp.code).json(resp.data)
  },
  async addNew(req, res) {
    const resp= await carsService.addNew(req.email, req.body)

    return res.status(resp.code).json(resp.data)
  },
  async update(req, res) {
    const resp= await carsService.update({
      email: req.email,
      car: req.body,
      id: req.params.id
    })

    return res.status(resp.code).json(resp.data)
  },
  async delete(req, res) {
    const resp= await carsService.delete({
      id: req.params.id,
      email: req.email
    })

    return res.status(resp.code).json(resp.data)
  },
}