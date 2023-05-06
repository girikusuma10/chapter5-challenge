const adminAccountsService = require("../services/adminAccounts.service")

module.exports= {
  async create(req, res) {
    const resp= await adminAccountsService.addNewAccount(req.body)

    return res.status(resp.code).json(resp.data)
  },
}