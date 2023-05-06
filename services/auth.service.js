const authRepository = require("../repositories/auth.repository")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const yup= require("yup")
const commonConfig = require("../config/common.config")
const validateYup = require("../utils/validateYup")

module.exports= {
  async login(data) {
    const loginDto= yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })

    try {
      const validate= await validateYup(loginDto, data)

      if (validate) {
        return {
          code: 400,
          data: {
            errors: validate
          }
        }
      }

      const {email, password}= data

      const getUser= await authRepository.findOne(email)

      if (!getUser) {
        return {
          code: 404,
          data: {
            error: "account is not found"
          }
        }
      }

      if (!await bcrypt.compare(password, getUser.password)) {
        return {
          code: 403,
          data: {
            error: "wrong password"
          }
        }
      }

      const token= await jwt.sign({
        email: getUser.email,
        role: getUser.role,
      }, commonConfig.jwtSecret, {
        expiresIn: "3d"
      })

      return {
        code: 200,
        data: {
          token
        }
      }
    } catch (error) {
      console.log(error);
      return commonConfig.internalServerErrorResponse
    }
  },
  async register(data) {
    const registerDto= yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    })

    try {
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

      if (await authRepository.findOne(email)) {
        return {
          code: 403,
          data: {
            error: "Email is already used."
          }
        }
      }

      await authRepository.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: commonConfig.memberRole
      })

      return {
        code: 200,
        data: {
          message: "account created."
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
  },
  async getProfile(email) {
    try {
      const getUser= await authRepository.findOne(email)
      
      return {
        code: 200,
        data: {
          name: getUser.name,
          email,
          role: getUser.role
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
    
  }
}