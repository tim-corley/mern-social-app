module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cannot be blank";
  }
  if (email.trim() === "") {
    errors.email = "email cannot be blank";
  } else {
    const regEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(regEx)) {
      errors.email = "email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "password cannot be blank";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username cannot be blank";
  }
  if (password.trim() === "") {
    errors.password = "password cannot be blank";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
