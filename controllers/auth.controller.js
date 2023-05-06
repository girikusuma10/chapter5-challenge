const authService = require("../services/auth.service")

module.exports= {
  async login(req, res) {
    const resp= await authService.login(req.body)

    return res.status(resp.code).json(resp.data)
  },
  async register(req, res) {
    const resp= await authService.register(req.body)

    return res.status(resp.code).json(resp.data)
  },
  async getProfile(req, res) {
    const resp= await authService.getProfile(req.email)
  
    return res.status(resp.code).json(resp.data)
  }
}