const express = require('express')
const cors = require('cors')
const app = express();
const port = 5050;
const {MongoClient} = require('mongodb')
app.use(express.json())
app.use(cors())
const uri = 'mongodb://localhost:27017/'
const UserDB = new MongoClient(uri);

const connectdb = async()=>{
    try {
        await UserDB.connect();
        console.log("database connected successfully!")
    } catch (error) {
        console.log("Some error occur during connection with database")
    }
}

connectdb();

const db = UserDB.db('logindata')
const login = db.collection('login')

app.post('/api/create',async(req,res)=>{
    try {
        const user = req.body
        const usercreate = await login.insertOne(user);
        res.json(usercreate)
    } catch (error) {
        console.log("error occured during insertion!")
    }
});

app.listen((port,()=>{
    console.log(`port is running on ${port}`)
}))