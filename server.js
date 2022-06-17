//set up dependencies/packages needed
const express = require('express')
const PORT = 3000
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'banki-questions'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
      
    })
//parse requests of content-type
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(bodyParser.json())

app.set('view engine', 'ejs')
//allows you to render data to an ejs template
app.use(express.static('public'))
//allows for css and client side js to render on template
app.use(express.urlencoded({ extended: true }))
//middleware for parsing bodies from URL
app.use(express.json())
//parses incoming JSON requests and puts the parsed data in req.body

app.get('/', (req,res) => {
    res.render('index.ejs')
    //will add more later
})

app.post('/api', (req,res) => {
    console.log('post heard')
    db.collection('questions').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))