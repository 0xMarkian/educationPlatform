import autobind from 'autobind-decorator'

import BasicCtrl from '../common/ctrl'
import { findCurrUserGroup } from '../user/utils'


class Student2CourseCtrl extends BasicCtrl {
  @autobind
  create(req,res, next){
    const { student, course } = req.body,
      { group } = req.user._doc

    this.Model.create({
      student,
      course,
      group
    }, (err, data) => {
      if(err) return next(err)

      res.status(201).json({ data })
    })
  }

  @autobind
  list(req, res, next){
    // To embed resource representatio(show not only ref to id, but external resources too) use API with query.
    // For example /?embed=student&embed=course
    const { embed = '' } = req.query,
      { _id: userId } = req.user
    findCurrUserGroup(userId).then( group => {
      this.Model
        .find({group})
        .populate(embed)
        .exec((err, data) => {
          if (err) return next(err)

          res.json({ data })
        })
    })
  }
}

export default Student2CourseCtrl
