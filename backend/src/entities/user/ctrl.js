import jwt from 'jsonwebtoken'
import autobind from 'autobind-decorator'

import config from '../../config'

import BasicCtrl from '../../lib/ctrl'


class UserCtrl extends BasicCtrl{
  @autobind
  register(req, res, next){
    const { name, password } = req.body

    this.Model.create({
      name,
      password,
    }, err => {
      if(err) return next(err)

      this.login(req, res, next)
    })
  }

  @autobind
  login(req, res, next) {
    const {name, password} = req.body
    this.Model.findOne({name}, (err, user) => {
      if (err) return next(err)

      if (!user) return res.status(401).json({success: false, message: 'Authentication failed. User not found.'})

      if (user.password !== password) return res.status(401).json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      })

      const { _id } = user
      const token = jwt.sign({_id}, config.secret)
      res.cookie('accessToken',token,{httpOnly:true}).json(user)
    })
  }
}

export default UserCtrl