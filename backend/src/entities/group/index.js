import { Router } from 'express'

import Group from './model'
import Ctrl from './ctrl'


const groupCtrl = new Ctrl(Group)
const router = Router()

router.route('/')
  .post(groupCtrl.create)
  .get(groupCtrl.list)

router.route('/:id')
  .patch(groupCtrl.update)

export default router
