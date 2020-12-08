const express = require('express');
const router = express.Router();
const http = require("https");
const db = require("../config/db_conn");
const { tokenGen } = require("../config/tokenGen");

router.get('/',(req,res)=>{
    db.query("select * from zayoapi where 1",(err,result)=>{
        if(err){
            return console.log("error in sql query");
        }
        else{
            if(result){
                if(result[0]){
                    var options = {
                        host: 'api.zayo.com',
                        path: '/services/service-management/v1/existing-services',
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': 0,
                          'Authorization' : result[0].access_token
                        }
                    };
                    var httpreq = http.request(options, function (response) {
                        response.setEncoding('utf8');
                        response.on('data', function (chunk) {
                        //   console.log("body: " + chunk);
                        if(response.statusCode == 401){
                            tokenGen(function(returnValue){
                                if(returnValue){
                                    db.query("update zayoapi set access_token = ? where id = ?",[returnValue, result[0].id ],(err, result)=>{
                                        if(err){
                                            res.send("unable to updte")
                                        }
                                        else{
                                            console.log("updated")
                                            res.send("new token generated")
                                        }
                                    })
                                }
                            });
                        }
                        else{
                            res.send("Approved User")
                        }
                        });
                        response.on('end', function() {
                          //res.send('ok');
                          console.log("ok access token checker ")
                        })
                    });
                    httpreq.end();
                }
                else{
                     res.send("no result")
                }
            }  
            else{
                res.send("no result found")
            }  
        }   
 
    });    
});

module.exports = router;