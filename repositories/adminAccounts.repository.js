const db= require("./../models")

module.exports= {
  getAll() {
    return db.Users.findAll({
      where: {
        role: "admin"
      }
    })
  },
  findOne(email) {
    return db.Users.findOne({
      where: {
        email,
        role: "admin"
      }
    })
  },
  create(data) {
    return db.Users.create(data)
  }
}