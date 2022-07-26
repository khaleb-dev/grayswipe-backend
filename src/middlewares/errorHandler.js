const handleErrors = (err) => {
  let errors = {};
  console.log(err.message, err.code);
  if (err.message.includes("email")) {
    errors.email = "Duplicate Email";
  }

  if (err.message.includes("phone_no")) {
    errors.phone_no = "Duplicate Phone Number";
  }

  if (err.message === "invalid credentials") {
    return (errors.emailOrPhoneNumber = "Invalid User Credentials.");
  }

  if (err.message === "user not found") {
    return (errors.emailOrPhoneNumber = "User not found.");
  }

  if (err.message === "invalid token") {
    return (errors.emailOrPhoneNumber = "Pin does not exist.");
  }

  if (err.message === "invalid query") {
    return "Invalid Query Parameter.";
  }

  if (err.message === "invalid passkey") {
    return "Password or Auth ID is required.";
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(( properties ) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { handleErrors };
