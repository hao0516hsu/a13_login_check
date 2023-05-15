const express = require('express')
const router = express.Router()

const User = require('../../models/user_account')

router.get("/", (req, res) => {
  // 檢查Cookies
  const user = req.cookies.username
  if (!user) {
    // 沒有登入的cookies時，進到登入畫面
    res.render('index')
  } else {
    // 有登入的cookies時，進到會員畫面
    res.render('login_success',{user})
  }
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
        // 登入成功後，產生cookies
        res.cookie('username', user)
        res.render('login_success', { user })
      }
    })
    .catch(error => console.log(error))
})


module.exports = router