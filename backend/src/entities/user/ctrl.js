import jwt from 'jsonwebtoken'
import autobind from 'autobind-decorator'

import config from '../../config'

import BasicCtrl from '../../lib/ctrl'


class UserCtrl extends BasicCtrl{
  @autobind
  signUp(req,res, next){
    const { name, password } = req.body

    this.Model.create({
      name,
      password,
    }, (err, newEntity) => {
      if(err) return next(err)

      res.json(newEntity)
    })
  }

  @autobind
  signIn(req,res, next) {
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
      res.cookie('access_token',token, {httpOnly: true,}).json({
        success: true,
      })
    })
  }
}

export default UserCtrl