const bcryptjs = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
    
      for (let i = 0; i < users.length; i++) {
        const exsistingPass = bcryptjs.compareSync(password, users[i].passHash)
        if (users[i].username === username) {
          if(exsistingPass){
            // console.log(exsistingPass)
            // console.log(users[i])
            let secureUserInfo = {...users[i]}
            delete secureUserInfo.passHash
            // console.log(secureUserInfo)
            return res.status(200).send(secureUserInfo)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const {username, email, firstName, lastName, password} = req.body
        let salt = bcryptjs.genSaltSync(8)
        let passHash = bcryptjs.hashSync(password, salt)

        let regObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }
        // console.log(regObj)
        users.push(regObj)
        res.status(200).send(regObj)
    }
}