const validate= async (rules, fields)=> {
  try {
    await rules.validate(fields, {
      abortEarly: false,
    });
    return null;
  } catch (error) {
    return error.errors;
  }
}

module.exports= validate