import Student2CourseCtrl from '../student2Course/ctrl'


class ScoreCtrl extends Student2CourseCtrl {
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
