const db = require("../config/database");

class User {
  constructor() {
    this.table = "creatorr";
  }
  checkEmail(email) {
    return db.execute(`SELECT * FROM ${this.table} WHERE  email = "${email}" `);
  }
  checkUsername(username) {
    return db.execute(
      `SELECT * FROM ${this.table} WHERE  username = "${username}" `
    );
  }
  signUp({ walletAddress, username, hashPassword, email, verificationToken }) {
    return db.execute(
      `INSERT INTO ${this.table} SET walletAddress = "${walletAddress}", username ="${username}", password = "${hashPassword}", email="${email}" , verificationToken='${verificationToken}'`
    );
  }
  VerifiyToken(verificationToken) {
    return db.execute(
      `SELECT * FROM ${this.table} WHERE verificationToken = '${verificationToken}'`
    );
  }
  updateUserStatus(verificationToken) {
    return db.execute(
      `UPDATE ${this.table} SET status = 1 WHERE verificationToken = '${verificationToken}'`
    );
  }
  signIn(email) {
    return db.execute(`SELECT * FROM  ${this.table} WHERE email = '${email}'`);
  }

  userData(otp) {
    return db.execute(`SELECT * FROM  ${this.table} WHERE otp = '${otp}'`);
  }

  addOtp(otp, email) {
    return db.execute(
      `UPDATE ${this.table} SET otp='${otp}' WHERE email = '${email}'`
    );
  }

  verifiyOtp(otp) {
    return db.execute(`SELECT * FROM ${this.table} WHERE otp = '${otp}'`);
  }
}

module.exports = User;
