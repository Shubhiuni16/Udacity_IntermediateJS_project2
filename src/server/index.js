require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// API call
const rovers = ['curiosity','opportunity','spirit']
const data=()=>{
    rovers.map((rover)=>{
        app.get(`/${rover}`, async (req, res) => {
            try {
                let images  = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=30&api_key=${process.env.API_KEY}`)
                .then(res => res.json())
                res.send({ images })
            } catch (err) {
                console.log('error:', err);
            }
        })

    })
}
data();


app.listen(port, () => console.log(`Dashboard app listening on port ${port}!`))