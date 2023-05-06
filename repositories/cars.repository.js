const db = require("../models")

const joinAttributes= ["name", "email"]

module.exports= {
  findAll() {
    return db.Cars.findAll({
      paranoid: false,
      attributes: ['id', 'name', 'perDayRentPrice', 'size', 'createdAt', 'updatedAt', 'deletedAt'],
      include: [
        {
          model: db.Users,
          as: "createdBy",
          required: false,
          attributes: joinAttributes
        },
        {
          model: db.Users,
          as: "updatedBy",
          required: false,
          attributes: joinAttributes
        },
        {
          model: db.Users,
          as: "deletedBy",
          required: false,
          attributes: joinAttributes
        },
      ]
    })
  },
  findOne(id) {
    return db.Cars.findOne({
      where: {
        id
      }
    })
  },
  findOneWithDeleted() {
    return db.Cars.findOne({
      paranoid: false,
      where: {
        id,
      }
    })
  },
  create(car) {
    return db.Cars.create(car)
  },
  update(id, data) {
    return db.Cars.update(data, {
      paranoid: false,
      where: {
        id
      }
    })
  },
  delete(id) {
    return db.Cars.destroy({
      where: {
        id
      }
    })
  }
}