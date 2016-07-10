import { Router } from 'express'

import Ctrl from './ctrl'
import Score from './model'

const scoreCtrl = new Ctrl(Score)
const router = Router()

router.route('/')
  .post(scoreCtrl.create)
  .get(scoreCtrl.list)

router.route('/:id')
  .patch(scoreCtrl.update)

export default router