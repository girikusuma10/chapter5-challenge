const bcrypt= require("bcrypt")
const yup= require("yup")
const adminAccountsRepository = require("../repositories/adminAccounts.repository")
const validateYup = require("../utils/validateYup")

module.exports= {
  async addNewAccount(data) {
    try {
      const registerDto= yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
      })

      const validate= await validateYup(registerDto, data)

      if (validate) {
        return {
          code: 400,
          data: {
            errors: validate
          }
        }
      }

      const {name, email, password}= data

      const accountExist= await adminAccountsRepository.findOne(email)

      if (accountExist) {
        return {
          code: 403,
          data: {
            error: "Email is already used."
          }
        }
      }

      const hashedPassword= await bcrypt.hash(password, 10)

      await adminAccountsRepository.create({
        name, 
        email,
        password: hashedPassword,
        role: "admin"
      })

      return {
        code: 200,
        data: {
          message: "account created."
        }
      }
    } catch (error) {
      console.log(error);

      return null
    }
  }
}