// Import axios
const axios = require('axios');

const { User } = require('../models');
// ! import compare untuk digunakan di login
const { comparePassword } = require('../helpers/bcrypt');
// ! import generate token saat register
const { generateToken } = require('../helpers/jwt');

class UserController {
  static postRegister(req, res) {
    const { name, email, password } = req.body;

    User.create({
      name,
      email,
      password,
    })

      .then((data) => {
        let user = {
          id: data.id,
          name: data.name,
          email: data.email,
        };
        //! mecegah agar pwd tidak masuk ke json
        res.status(201).json({ msg: `User berhasil dibuat!`, user });
      })

      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `Internal server is an error!` });
      });
  }

  static postLogin(req, res) {
    const { email, password } = req.body;
    //! mencari email
    User.findOne({
      where: { email },
    })

      .then((data) => {
        if (data) {
          //? data bernilai benar dan ada
          //checking pass
          let checkPassword = comparePassword(password, data.password);
          if (checkPassword) {
            //? ketika password dan ada
            let payload = {
              id: data.id,
              email: data.email,
            };
            const access_token = generateToken(payload);
            res.status(200).json({ access_token });
          } else {
            res.status(401).json({ msg: `Invalid email/password` });
          }
        } else {
          res.status(401).json({ msg: `Invalid email/password` });
        }
      })

      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `Internal server is an error!` });
        next();
      });
  }

  static async loginGoogleByAccessToken(req, res) {
    try {
      const config = {
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${req.query.access_token}`,
      };

      const response = await axios(config);
      const data = response.data;

      const [user, created] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name },
      });

      let payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = generateToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: `Internal server is an error!` });
    }
  }
}

module.exports = UserController;
