import jwt from 'jsonwebtoken'
import autobind from 'autobind-decorator'

import config from '../../config/index'

import BasicCtrl from '../common/ctrl'

import { filterValidationErrObj } from '../common/utils'


class UserCtrl extends BasicCtrl {
  @autobind
  getMe(req, res, next) {
    const { _id: userId } = req.user
    
    this.Model
      .findById(userId)
      .exec( (err, user) => {
        if(err) return next(err)

        res.json({ data: user})
      })
  }

  @autobind
  register(req, res, next){
    const { name, password } = req.body

    this.Model.create({
      name,
      password,
    }, err => {
      if(err) return res.status(400).json({ errors: filterValidationErrObj(err.errors) })

      this.login(req, res, next)
    })
  }

  @autobind
  login(req, res, next) {
    const {name, password} = req.body
    this.Model.findOne({name}, (err, user) => {
      if (err) return next(err)

      if (!user) return res.status(401).json({
        message: 'Authentication failed.',
        errors: { name: 'User not found.' },
      })

      if (user.password !== password) return res.status(401).json({
        message: 'Authentication failed.',
        errors: { password: 'Wrong password.' }
      })

      const { _id, name } = user
      const token = jwt.sign({_id, name, lastLoginDate: new Date() }, config.secret)
      res.cookie('accessToken',token,{path:'/', httpOnly:true}).json({ data: user })
    })
  }

  @autobind
  logout(req, res, next) {
    res.clearCookie('accessToken', { httpOnly: true }).sendStatus(200)
  }

  @autobind
  update(req,res, next){
    req.params.id = req.user._id
    const { password } = req.body
    if(password) return res.status(400).json({ message: 'You can\'t change password using PATCH /users/me' })

    BasicCtrl.prototype.update.call(this, req,res,next)
  }
}


export default UserCtrl
