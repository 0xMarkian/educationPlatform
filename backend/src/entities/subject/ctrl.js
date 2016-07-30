import BasicCtrl from '../common/ctrl'
import autobind from 'autobind-decorator'


class SubjectCtrl extends BasicCtrl {
  @autobind
  create(req,res, next){
    const { name } = req.body

    this.Model.create({
      name,
    }, (err, data ) => {
      if(err) return next(err)

      res.json({ data })
    })

  }
}

export default SubjectCtrl