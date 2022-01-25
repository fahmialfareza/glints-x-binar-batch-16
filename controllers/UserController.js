const { User } = require('../models');
// ! import compare untuk digunakan di login
const { comparePassword } = require('../helpers/bcrypt')
// ! import generate token saat register
const { generateToken } = require('../helpers/jwt');


class UserController {
  static postRegister (req,res) {
    const { name, email, password } = req.body;

    User.create({
      name,
      email,
      password
    })

    .then((data) => {
      
      let user = {
        id : data.id,
        name: data.name,
        email: data.email
      }
      //! mecegah agar pwd tidak masuk ke json
      res.status(201).json({msg: `User berhasil dibuat!`, user })
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({msg:`Internal server is an error!`})
    })
  }

  static postLogin (req,res) {
    const { email, password } = req.body;
    //! mencari email
    User.findOne({
      where: {email}
    })

    .then ((data) => {
      if (data) { //? data bernilai benar dan ada
        //checking pass
        let checkPassword = comparePassword(password, data.password);
        if (checkPassword) { //? ketika password dan ada 
          let payload = {
            id : data.id,
            email : data.email
          }
            const access_token = generateToken(payload);
            res.status(200).json({access_token});
          } 
          else {
            res.status(401).json({msg: `Invalid email/password`})
          }
      } 
      else {
        res.status(401).json({msg: `Invalid email/password`})
      }
    })

    .catch ((err) => {
      console.log(err);
      res.status(500).json({msg:`Internal server is an error!`})
      next()
    })
  }

}

module.exports = UserController;