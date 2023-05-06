const db = require("../models")

module.exports= {
  findOne(email) {
    return db.Users.findOne({
      where: {
        email
      }
    })
  },
  create(data) {
    return db.Users.create(data)
  },
}