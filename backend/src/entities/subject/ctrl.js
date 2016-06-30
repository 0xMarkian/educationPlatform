import BasicCtrl from '../../lib/ctrl'


class SubjectCtrl extends BasicCtrl {
  create(req,res, next){
    const { name } = req.body

    Subject.create({
      name,
    }, (err, newEntity ) => {
      if(err) return next(err)

      res.json(newEntity)
    })

  }
}

export default SubjectCtrl