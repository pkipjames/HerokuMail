const express = require ("express");
const bodyParser  = require ("body-parser");
const request = require ("request");
const http = require ("http");
const https = require("https");
    const app = express();

    app.use (bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));



    app.get("/", function(req, res){
        res.sendFile(__dirname+ "/signup.html");
});

    app.post("/", function(req , res){
      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;

      const data = {
        members: [{
          email_address: email,
          status:"subscribed",
          merge_fields:{
            LNAME: lastName,
            FNAME: firstName
            }
          }
        ]
      };

      var jsonData = JSON.stringify(data);


        const url = "https://us17.api.mailchimp.com/3.0/lists/62afeb075f";
        const  options = {
          method: "POST",
          auth: "Kvintma:5a99c78acfc949f0588e0a72c51bdd5e"
        }

      const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
          res.sendFile(__dirname+ "/success.html")
        }else{
          res.sendFile(__dirname+ "/failure.html")
        }

        response.on("data", function(data){
          console.log(JSON.parse(data));
        })
      })
            request.write(jsonData);
            request.end();


    });
//End of all hope! тобишь конец POST'a


    //редирект кнопки в failure.html
    app.post("/failure", function(req, res){
      res.redirect("/");
    });

    //console.log(request);
    app.listen(process.env.PORT||3000, function(){
      console.log("Server running on port 3000");
    })


//Api Key
//5a99c78acfc949f0588e0a72c51bdd5e-us17

// ListID
//    62afeb075f
