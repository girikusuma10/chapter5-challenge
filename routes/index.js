const { roles, superadminRole, adminRole } = require("../config/common.config")
const adminAccountsController = require("../controllers/adminAccounts.controller")
const apiDocController = require("../controllers/apiDoc.controller")
const authController = require("../controllers/auth.controller")
const carsController = require("../controllers/cars.controller")
const publicController = require("../controllers/public.controller")
const authMiddleware = require("../middlewares/auth.middleware")

module.exports= (route)=> {
  const allRolesMiddleware= authMiddleware(roles)
  const allAdminsMiddleware= authMiddleware([superadminRole, adminRole])
  const onlySuperadminMiddleware= authMiddleware([superadminRole])

  route.get('/apiDocJson', apiDocController.apiDocJson)

  route.post("/auth/login", authController.login)
  route.post("/auth/register", authController.register)
  route.get("/auth/profile", allRolesMiddleware, authController.getProfile)

  route.get("/public/cars", publicController.getAllCars)

  route.post("/admin/accounts", onlySuperadminMiddleware, adminAccountsController.create)

  route.get("/admin/cars", allAdminsMiddleware, carsController.getAll)
  route.post("/admin/cars", allAdminsMiddleware, carsController.addNew)
  route.put("/admin/cars/:id", allAdminsMiddleware, carsController.update)
  route.delete("/admin/cars/:id", allAdminsMiddleware, carsController.delete)
}