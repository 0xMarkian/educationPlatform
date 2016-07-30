import autobind from 'autobind-decorator'

import User from '../user/model'
import { findCurrUserGroup } from '../user/utils'
import BasicCtrl from '../common/ctrl'

class GroupCtrl extends BasicCtrl {
  @autobind
  create(req, res, next){
    const { name } = req.body

    const { _id: userId } = req.user

    User.findById(userId, (err, user) => {
      if(user.group) return next(new Error('This user already have a group'))

      this.Model.create({
        name,
      }, (err, newGroup ) => {
        if(err) return next(err)

        User
          .update({_id: userId}, { group: newGroup._id} )
          .exec( err => { if(err) return next(err)} )

        res.status(201).json({ data: newGroup, })
      })
    })
  }

  @autobind
  list(req,res, next){
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model
        .find({_id: group})
        .exec( (err, data) => {
          if(err) return next(err)

          res.json({ data })
        })
    })
  }
}

export default GroupCtrl