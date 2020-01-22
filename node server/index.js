const express = require("express")
const app = express()
const cors = require("cors")
const bodyp = require("body-parser")
const mongodb = require("mongodb")
const mongoclient = mongodb.MongoClient
const url = "mongodb://localhost:27017"
const port = 3000
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

app.use(cors());
app.use(bodyp.json());

//authentication
function authentication(req, res, nxt) {
  // var incomingToken=req.header("Authorization")
  var incomingToken=req.body.data
  // incomingToken="hvgrfvriktudtfedhvfifeiyvy"
  // var incomingToken = localStorage.getItem("token");
// console.log(incomingToken)
  jwt.verify(incomingToken,"code",function(err,decode){
    // console.log(decode)
    if(decode !== undefined){
      nxt()
    }
    else{
      res.status(401).json({
        mssg:"not permitted"
      })
    }
  })
}



//getting data from form & post to data base encrypted 
app.post('/data', function (req, res) {

  mongoclient.connect(url, function (err, client) {

    if (err) throw err;

    db = client.db("myflim")

    bcrypt.genSalt(saltRounds, function (err, salt) {

      if (err) throw err;

      bcrypt.hash(req.body.password, salt, function (err, hash) {

        req.body.password = hash

        // console.log(req.body)

        if (err) throw err;

        db.collection("authors").insertOne(req.body, function (err, data) {

          if (err) throw err;
          // console.log(err)
          res.status(200).json({ "mess": "inserted data in data base" })


          // console.log(data)
        })
        client.close()

      })

    })
  })

})



//login with token
app.post('/login',function(req,res){

  mongoclient.connect(url, function(err, client) {
    if (err) throw err;

    db=client.db("myflim")
    
    // console.log(req.body)
    var result=db.collection("authors").findOne({email:req.body.email})

    result.then(
      function (userdata){
        // console.log(userdata)
        // console.log(req.body)

        if(userdata == null){
          res.json({
            mess:"mail id not found"
          })
        }

        else{
        bcrypt.compare(req.body.password,userdata.password,function (err,hashresult){
          if(hashresult==true){
            
            const data={ //payload
              email:req.body.email
            }
            jwt.sign({data},"code",  { expiresIn: '50s' } ,function(err,token){
              if (err) throw err;
              console.log(token)
              res.json({
                mess:"welcome",
                token: token
              })
            })

          }

          else{
            res.json({
              mess:"invalid password"
            })
          }
        })
        }

        client.close()
      })

    })

  })



//message on empty url
app.get('/',function (req, res) {
  res.send("<h1>hellow switch to data</h1>")
})

//check token
app.post('/afterlogin', authentication , function (req, res) {
  res.json({
    "key":"val"
  })
})

//port listering
app.listen(port, () => { console.log(`Example app listening on the port ${port}!`) })




