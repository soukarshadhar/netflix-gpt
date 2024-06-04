export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email)
    ? { valid: true }
    : { valid: false, message: "Please enter a valid email address" };
};

export const validatePassword = (password) => {
  if (!password) {
    return {
      valid: false,
      message: "Required",
    };
  }

  const messages = [];

  if (!/[a-z]/g.test(password)) {
    messages.push("atleast one lowercase character");
  }

  if (!/[A-Z]/g.test(password)) {
    messages.push("atleast one uppercase character");
  }

  if (!/[@#*]/g.test(password)) {
    messages.push("atleast one special character (@ # *)");
  }

  if (!/^.{6,}$/g.test(password)) {
    messages.push("atleast 6 characters");
  }

  if (messages.length === 0) return { valid: true };

  return {
    valid: false,
    message: `Your password must contain ${messages.join(", ")}.`,
  };
};
