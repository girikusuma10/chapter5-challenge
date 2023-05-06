const jwt= require("jsonwebtoken")
const commonConfig = require("../config/common.config")

module.exports= (authorizedRoles)=>
  async (req, res, next)=> {
    try {
      const token= req.headers["authorization"]

      if (!token) {
        return res.status(401).json({
          message: "token is not present."
        })
      }

      const jwtToken= token.split(" ")[1]
      const parsedToken= await jwt.verify(jwtToken, commonConfig.jwtSecret)

      if (!authorizedRoles.includes(parsedToken?.role)) {
        return res.status(401).json({
          message: "sorry your role is too low to access this resource."
        })
      }

      req.email= parsedToken.email

      next()
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "invalid token."
      })
    }
  }