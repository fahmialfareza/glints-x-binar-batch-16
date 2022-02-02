//! membawa 3 params -> req,res,next
//! require model 
const { Todo, User } = require('../models')
//! import jwt untuk proses verifikasi 
const { verifyToken } = require('../helpers/jwt');
//! verifikasi selalu ada di authentication
//! by defaul membawa 3 params 
function authenticate (req,res,next) {
  const { access_token } = req.headers;
  //! const access_token = req.headers.access_token
  console.log(req.headers , '<<< ini dari headers');
  //! jika access token nya benar 
  if (access_token) {
    //! untuk verifikasi akses token
    const decoded = verifyToken(access_token);
    //! cek email -> bener atau engga
    //! mencari email 
    User.findOne({
      where: {
        email: decoded.email
      }
    })

    .then ((user) => {
      if (!user) {
        res.status(401).json({msg: `Invalid access token!`})
      } else {
        //! ini sebagai foreign key 
        res.user = {id : user.id}
        next()
      }
    })

    .catch ((err) => {
      console.log(err);
      res.status(500).json({msg: `Internal server is an error!`})
    })
  }
  else {
    res.status(401).json({msg: `Invalid access token!`})
  }
}

function authorize (req,res,next) {
  const id = +req.params.id;

  Todo.findOne({where: {id}})
  .then((data) => {
    if (data) {
      const valid = req.user.id === todo.UserId;
      if (valid) {
        next()
      }
      else {
        res.status(401).json(`Unauthorized`)
      }
    } 
    else {
      res.status(401).json(`Unauthorized`)
    }
  })

  .catch((err) => {
    console.log(err);
    res.status(500).json({msg: `Internal server is an error!`})
  })
}

module.exports = {
  authenticate,
  authorize
}