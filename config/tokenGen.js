const http = require('https');
var querystring = require('querystring');

var tokenGen = (callback)=>{
    var data = querystring.stringify({
        client_id :"60050666-7d86-4e48-8873-493f6eb1339e",
        client_secret :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IjYwMDUwNjY2LTdkODYtNGU0OC04ODczLTQ5M2Y2ZWIxMzM5ZSI.bfX3mdZfxHLNb7TC3aMtcU5qBTTXlk7seKPBHVeB6D4",
        grant_type :"client_credentials",
        scope:"openid"
    });
  
    var options = {
      host: 'auth.api.zayo.com',
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', (chunk) =>{
            var resData = JSON.parse(chunk)
            if(resData.access_token){
                //return resData.access_token
                callback(resData.access_token)
            }        
        });
        response.on('end',()=> {
          console.log('ok');
        })
      });
      httpreq.write(data);
      httpreq.end();

}

module.exports.tokenGen = tokenGen;