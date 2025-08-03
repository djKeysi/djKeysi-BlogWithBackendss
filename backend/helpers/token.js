const jwt = require("jsonwebtoken");
const sign = "testtest";

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    // if (!token) {
    //   throw new Error("Invalid token");
    // }
    return jwt.verify(token, sign); // на выходе получим инфрмацию которая хранится в токене
  },
};
