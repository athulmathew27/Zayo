const express = require("express");
const app = express();
require('dotenv').config();
const request = require("request")

const tokenRoute = require("./routes/token");
const  existServiceRoute = require("./routes/existing_service");

app.use(express.json());
app.use(express.urlencoded({extended  : false  }));
app.use('/token', tokenRoute);
app.use('/existing_service', existServiceRoute);



const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));