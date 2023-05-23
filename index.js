const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors())
app.use(express.json())

// mongoDB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.lpihfko.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});





async function run() {
    try {
        await client.connect();

        const components = client.db("gamingComponents").collection("products");
        const choiceList = client.db("choiceList").collection("products");
        const addList = client.db("addList").collection("products");

        app.get('/category', async (req, res) => {
            const result = await components.find().toArray();
            res.send(result);
        })

        app.post('/choiceList', async (req, res) => {
            const product = req.body;
            const result = await choiceList.insertOne(product);
            res.send(result);
        })

        app.get('/choiceList', async (req, res) => {
            const result = await choiceList.find().toArray();
            res.send(result);
        })

        app.post('/addList', async (req, res) => {
            const product = req.body;
            const result = await addList.insertOne(product);
            res.send(result);
        })

        app.get('/addList', async (req, res) => {
            const result = await addList.find().toArray();
            res.send(result);
        })

        app.delete('/addList/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await addList.deleteOne(query);
            res.send(result);
        })

        app.put('/addList/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updatedValue = req.body;

            const value = {
                $set: {
                    photo: updatedValue.photo,
                    name: updatedValue.name,
                    sellerName: updatedValue.sellerName,
                    email: updatedValue.email,
                    category: updatedValue.category,
                    price: updatedValue.price,
                    rating: updatedValue.rating,
                    quantity: updatedValue.quantity,
                    about: updatedValue.about
                }
            }
            const result = await addList.updateOne(filter, value, option);
            res.send(result);
        })

        app.delete('/addList/:mail', async (req, res) => {
            const mail = req.params.mail;
            const query = { email: mail }
            const result = await addList.deleteMany(query);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('server is running')
})


app.listen(port, () => {
    console.log(`Server is running on port: `)
})