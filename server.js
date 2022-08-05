const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const connectionString = "mongodb+srv://harry:3107@cluster0.g1y6fbr.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    const db = client.db('harry-potter-quotes')
    const quotesCollection = db.collection('quotes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html')
    db.collection('quotes').find().toArray()
    .then(results => {
        res.render('index.ejs', { quotes: results })
    })
    .catch(error => console.error(error))
})

app.post('/quotes', (req, res) => {
    if (!req.body.name) {
        return res.json({
            success: false,
            message: 'Name is can`t be empty'
        });
    }
    quotesCollection.insertOne(req.body)
    .then( result => res.json({
        success: true,
        message: 'Created'
    }))

    // .then(result => {
    //     res.redirect('/')
    // })
    .catch(error => console.error(error))
})

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
        {name: 'Albus'},
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    )
    .then( result => res.json('Success'))
    .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
        { name: req.body.name }
    )
    .then( result => {
        if (!result.deletedCount) {
            return res.json('No quote to delete')
        }
        res.json(`Deleted Voldemort's quote`)
    })
    .catch( error => console.error(error))
})

app.listen(3000, function() {
    console.log('listening on 3000')
})

})
.catch (error => console.error(error))
