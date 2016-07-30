import Student2CourseCtrl from '../student2Course/ctrl'
import autobind from 'autobind-decorator'
import { findCurrUserGroup } from '../user/utils'

class ScoreCtrl extends Student2CourseCtrl {
  @autobind
  create(req,res, next){
    const { scoreValue, student, course } = req.body
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model.create({
        scoreValue,
        student,
        course,
        group,
      }, (err, data) => {
        if(err) return next(err)

        res.status(201).json({ data })
      })
    })
  }
}

export default ScoreCtrl
