import BasicCtrl from '../../lib/ctrl'
import autobind from 'autobind-decorator'


class SubjectCtrl extends BasicCtrl {
  @autobind
  create(req,res, next){
    const { name } = req.body

    this.Model.create({
      name,
    }, (err, newEntity ) => {
      if(err) return next(err)

      res.json(newEntity)
    })

  }
}

export default SubjectCtrl