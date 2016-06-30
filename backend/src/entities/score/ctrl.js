import Student2CourseCtrl from '../student2Course/ctrl'
import autobind from 'autobind-decorator'


class ScoreCtrl extends Student2CourseCtrl {
  @autobind
  create(req,res, next){
    const { scoreValue, student, course } = req.body,
      { group } = req.user._doc

    this.Model.create({
      scoreValue,
      student,
      course,
      group,
    }, (err, newEntity) => {
      if(err) return next(err)

      res.status(201).json(newEntity)
    })
  }
}

export default ScoreCtrl
