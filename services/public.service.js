const commonConfig = require("../config/common.config");
const publicRepository = require("../repositories/public.repository")

module.exports= {
  async getAllCars() {
    try {
      const cars= await publicRepository.findAllCars()

      return {
        code: 200,
        data: {
          cars
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
  },
}