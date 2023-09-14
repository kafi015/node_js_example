const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json()); 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mfhbhxa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
        const user = client.db('NodeFirstP').collection('userCollection');

        app.get('/users',async (req, res) => {
            let query = {};
            const cursor = user.find(query);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.post('/users', async (req, res) => {
            const userrr = req.body;
            const result = await user.insertOne(userrr);
            res.send(result);
        });

        app.get('/users',async (req, res) => {
            let query = {};
            const cursor = user.find(query);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.get('/userEmail', async (req, res) => {
            let query = {};
    
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = user.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });


        app.get('/jobs', async (req, res) => {
            let query = {};
            const cursor = jobOn.find(query).limit(0).sort({$natural:-1});
            const a = await cursor.toArray();
            res.send(a); 
        });
        //new
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await jobOn.findOne(query);
            res.send(b);
        });

    

        

    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/',(req,res)=>{
    res.send('Node')
})

app.listen(port, ()=>{
    console.log(`Node${port}`)
})