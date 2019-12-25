const express =require("express")
const app=express()
const cors=require("cors")
const bodyp=require("body-parser")
const mongodb=require("mongodb")
const mongoclient=mongodb.MongoClient
const url="mongodb://localhost:27017"
const port = 3000

app.use(cors());
app.use(bodyp.json());

//getting data from form & post to data base
app.post('/data',function(req,res){
    
    mongoclient.connect(url, function(err, client) {
      if (err) throw err;
      
      // console.log(req.body)
      
      db=client.db("myflim")

      db.collection("authors").insertOne(req.body,(err,data)=>{
        if (err) throw err;

        // console.log(data)

        res.json({"mess":"inserted data in data base"})
    
      }
    )
        client.close()
    
    });
})


//appending data to table from data base
app.get('/data',function(req,res){
  
  mongoclient.connect(url, function(err, client) {
    if (err) throw err;
    
    // console.log(req.body)
    
    db=client.db("myflim")

    var userCurso=db.collection("authors").find().toArray();
    
    userCurso.then((daa)=>{
      res.json(daa)
    })
    
    client.close()
    
  });
})


//message on empty url
app.get('/',function(req,res){
    res.send("<h1>hellow switch to data</h1>")
})

//port listering
app.listen(port, () => {console.log(`Example app listening on port ${port}!`) })




