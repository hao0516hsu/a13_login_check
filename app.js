const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get("/", (req, res) => {
  res.render('index')
})

app.post("/", (req, res) => {
  const { accn, pw } = req.body
  res.redirect('/home')
})

app.get("/home", (req, res) => {
  res.render('login_success')
})
app.listen(3000, () => {
  console.log(`App is listening to http://localhost:3000`)
})