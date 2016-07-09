import { Router } from 'express'

import Course from './model'
import Ctrl from './ctrl'


const courseCtrl = new Ctrl(Course)
const router = Router()

router.route('/')
  .post(courseCtrl.create)
  .get(courseCtrl.list)



export default router
