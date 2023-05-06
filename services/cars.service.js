const yup= require("yup")
const commonConfig = require("../config/common.config");
const carsRepository = require("../repositories/cars.repository")
const validateYup = require("../utils/validateYup")

const carDto= yup.object({
  name: yup.string().required(),
  perDayRentPrice: yup.number().required(),
  size: yup.string().oneOf(commonConfig.carSizes).required()
})

module.exports= {
  async getAll() {
    try {
      const cars= await carsRepository.findAll()

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
  async addNew(email, car) {
    try {
      const validate= await validateYup(carDto, car)

      if (validate) {
        return {
          code: 400,
          data: {
            errors: validate
          }
        }
      }

      const {name, perDayRentPrice, size}= car

      await carsRepository.create({
        name,
        perDayRentPrice,
        size,
        createdByFk: email
      })
  
      return {
        code: 200,
        data: {
          message: "car created."
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
  },
  async update(data) {
    try {
      const validate= await validateYup(carDto, data.car)

      if (validate) {
        return {
          code: 400,
          data: {
            errors: validate
          }
        }
      }

      const {name, perDayRentPrice, size}= data.car
      
      const findCar= await carsRepository.findOne(data.id)

      if (!findCar) {
        return {
          code: 404,
          data: {
            error: "car is not found."
          }
        }
      }
      
      await carsRepository.update(data.id, {
        name,
        perDayRentPrice,
        size,
        updatedByFk: data.email
      })

      return {
        code: 200,
        data: {
          message: "car successfully updated."
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
  },
  async delete(data) {
    try {
      const findCar= await carsRepository.findOne(data.id)

      if (!findCar) {
        return {
          code: 404,
          data: {
            error: "car is not found."
          }
        }
      }

      await carsRepository.delete(data.id)

      await carsRepository.update(data.id, {
        deletedByFk: data.email
      })
  
      return {
        code: 200,
        data: {
          message: "car successfully deleted."
        }
      }
    } catch (error) {
      console.log(error);

      return commonConfig.internalServerErrorResponse
    }
  },
}