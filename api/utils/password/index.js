//ONLY HASH FORFIRST REGISTRATION, NEXT USE BCRYPT

const generatePassword = () => {
  let pass = "";
  const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random() * set.length + 1);
    pass += set.charAt(char);
  }

  return pass;
};

module.exports = { generatePassword };
