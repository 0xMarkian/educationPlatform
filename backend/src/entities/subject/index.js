import { Router } from 'express'

import Subject from './model'
import Ctrl from './ctrl'

const subjectCtrl = new Ctrl(Subject)
const router = Router()

router.route('/')
  .post(subjectCtrl.create)
  .get(subjectCtrl.listAll)


export default router