const roles= ["superadmin", "admin", "member"]
const carSizes= ["small", "medium", "large"]

module.exports= {
  roles,
  carSizes,
  smallCar: carSizes[0],
  superadminRole: roles[0],
  adminRole: roles[1],
  memberRole: roles[2],
  jwtSecret: "secret",
  internalServerErrorResponse: {
    code: 500,
    data: {
      error: "there is error in server."
    }
  }
}