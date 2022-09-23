export const setLocalStorage = (owner, item) => {
  switch (owner) {
    case "SUPER_USER":
      localStorage.setItem(
        process.env.REACT_APP_SUPER_USER_LS_KEY.toString(),
        item
      );
      break;
    case "ADMIN":
      localStorage.setItem(process.env.REACT_APP_ADMIN_LS_KEY.toString(), item);
      break;
    case "VOTER":
      localStorage.setItem(process.env.REACT_APP_VOTER_LS_KEY.toString(), item);
      break;
    default:
      // do nothing
      break;
  }
};

export const getLocalStorage = (owner) => {
  let item;

  switch (owner) {
    case "SUPER_USER":
      item = localStorage.getItem(
        process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
      );
      break;
    case "ADMIN":
      item = localStorage.getItem(
        process.env.REACT_APP_ADMIN_LS_KEY.toString()
      );
      break;
    case "VOTER":
      item = localStorage.getItem(
        process.env.REACT_APP_VOTER_LS_KEY.toString()
      );
      break;
    default:
      item = "";
      break;
  }
  return item;
};

export const deleteLocalStorage = (owner) => {
  switch (owner) {
    case "SUPER_USER":
      localStorage.removeItem(process.env.REACT_APP_SUPER_USER_LS_KEY);
      break;
    case "ADMIN":
      localStorage.removeItem(process.env.REACT_APP_ADMIN_LS_KEY);
      break;
    case "VOTER":
      localStorage.removeItem(process.env.REACT_APP_VOTER_LS_KEY);
      break;
    default:
      // do nothing
      break;
  }
};
