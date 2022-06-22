export const validateName = (name) => {
  if (name.length >= 1) {
    return true;
  }
  return false;
};

export const validateEmail = (email) => {
  const emailFormat = /\S+@\S+\.\S+/;
  const isValid = emailFormat.test(email);
  if (isValid) {
    return true;
  }
  return false;
};

export const validatePassword = (password) => {
  if (password.length >= 1) {
    return true;
  }
  return false;
};

export const validateNick = (nick) => {
  if (nick.length >= 1) {
    return true;
  }
  return false;
};
