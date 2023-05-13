const express = require('express')
const router = express.Router()

const User = require('../../models/user_account')

router.get("/", (req, res) => {
  res.render('index')
})

router.post("/", (req, res) => {
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


module.exports = router