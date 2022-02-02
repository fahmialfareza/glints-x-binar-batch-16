const { sendEmail } = require('../helpers/emailSender');

class UserController {
  static async register(req, res) {
    try {
      // User registration
      const { name, email } = req.body;

      /* Register user logic */

      /* End of register user logic */

      //! send email with nodemailer
      await sendEmail(
        email,
        'Registration Success',
        'You have successfully registered',
        `<b>Welcome ${name}</b>`
      );

      res.status(201).json({ msg: `User berhasil dibuat!`, data: req.body });
    } catch (error) {
      res.status(500).json({ msg: `Internal server is an error!` });
    }
  }
}

module.exports = UserController;
