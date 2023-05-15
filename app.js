const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
// 匯入模組：cookie-parser
const cookieParser = require("cookie-parser")

const routes = require('./routes/index')
require('./config/mongoose')
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
// 啟動cookie-parser
app.use(cookieParser())
app.use(routes)

app.listen(3000, () => {
  console.log(`App is listening to http://localhost:3000`)
})