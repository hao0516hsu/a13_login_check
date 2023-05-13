const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require('./models/user_account')

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

  User.findOne({ email: accn })
    .lean()
    .then(user => {
      if (!user) {
        const emailErr = true
        res.render('index', { emailErr, accn, pw })
      } else if (user.password !== pw) {
        const passwordErr = true
        res.render('index', { passwordErr, accn, pw })
      } else {
        res.render('login_success', { user })
      }
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log(`App is listening to http://localhost:3000`)
})