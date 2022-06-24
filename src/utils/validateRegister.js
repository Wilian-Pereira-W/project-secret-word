export const validateName = (error) => {
  const err = [];
  error.forEach((item) => {
    if (item.includes('nome')) {
      err.push(item);
    }
  });
  return err;
};

export const validateEmail = (error) => {
  const err = [];
  error.forEach((item) => {
    if (item.includes('email')) {
      err.push(item);
    }
  });
  return err;
};

export const validatePassword = (error) => {
  const err = [];
  error.forEach((item) => {
    if (item.includes('senha')) {
      err.push(item);
    }
  });
  return err;
};

export const validateNick = (error) => {
  const err = [];
  error.forEach((item) => {
    if (item.includes('nick')) {
      err.push(item);
    }
  });
  return err;
};
