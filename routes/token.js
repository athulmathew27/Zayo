const express = require('express');
const router = express.Router();
const db = require('../config/db_conn');
var { tokenGen } = require("../config/tokenGen");
const http = require('https');
const querystring = require('querystring');


router.get('/', function (req, res) {

  tokenGen(function(returnValue){
    if(returnValue){
      db.query("insert into zayoapi (access_token) values (?)", [returnValue], (err,result,feild)=>{
        if(err){
          return console.log(err)
        }
        console.log("Token stored successfully");
        res.send("Token stored successfully")
      })   
    }
    else{
      res.send("No token genereated")
    }
  });

    // var data = querystring.stringify({
    //     client_id :"60050666-7d86-4e48-8873-493f6eb1339e",
    //     client_secret :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IjYwMDUwNjY2LTdkODYtNGU0OC04ODczLTQ5M2Y2ZWIxMzM5ZSI.bfX3mdZfxHLNb7TC3aMtcU5qBTTXlk7seKPBHVeB6D4",
    //     grant_type :"client_credentials",
    //     scope:"openid"
    // });
  
    // var options = {
    //   host: 'auth.api.zayo.com',
    //   path: '/oauth/token',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Length': Buffer.byteLength(data)
    //   }
    // };
  
    // var httpreq = http.request(options, function (response) {
    //   response.setEncoding('utf8');
    //   response.on('data', (chunk) =>{
    //       var resData = JSON.parse(chunk)
    //       if(resData.access_token != null){
    //         db.query("insert into zayoapi (access_token) values (?)", [resData.access_token], (err,result,feild)=>{
    //             if(err){
    //                 return console.log(err)
    //             }
    //             console.log("Token stored successfully");
    //         })  
    //       }        
    //   });
    //   response.on('end',()=> {
    //     res.send('ok');
    //   })
    // });
    // httpreq.write(data);
    // httpreq.end();
});

module.exports=router;