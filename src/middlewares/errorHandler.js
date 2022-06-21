const handleErrors = (err) => {
  let errors = {};
  console.log(err.message, err.code);
  if (err.code === 11000) {
    errors.emailOrPhoneNumber = "Duplicate email.";
  }

  if (err.message === "invalid credentials") {
    return (errors.emailOrPhoneNumber = "Invalid User Credentials.");
  }

  if (err.message === "user not found") {
    return (errors.emailOrPhoneNumber = "User not found.");
  }

  if (err.message === "invalid token") {
    return (errors.emailOrPhoneNumber = "Token does not exist.");
  }

  if (err.message === "invalid query") {
    return "Invalid Query Parameter.";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      Object.assign(errors[properties.path], properties.message);
    });
  }

  return errors;
};

module.exports = { handleErrors };
