const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes');
const cors = require('cors');

//! by default ./routes tanpa memanggil file apapun -> akan menuju ke index.js
// ? for configuration env
require('dotenv').config();
//* body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cors());

app.listen(port, () => {
  console.log(`app nya acil jalan nih di port : ${port}`);
});
