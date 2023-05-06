const db = require("../models")

module.exports= {
  findAllCars() {
    return db.Cars.findAll({
      attributes: ['id', 'name', 'perDayRentPrice', 'size', 'createdAt', 'updatedAt'],
    })
  },
}