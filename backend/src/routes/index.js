const express = require('express')

import groupRoutes from '../controllers/group'
import studentRoutes from '../controllers/student'
import courseRoutes from '../controllers/course'
import scoreRoutes from '../controllers/score'
import student2CourseRoutes from '../controllers/student2Course'
import subjectRoutes from '../controllers/subject'
import userRoutes from '../controllers/user'

import setupRoute from './setup'

import config from '../config'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const router = express.Router()

router.use('/groups', groupRoutes)
router.use('/students', studentRoutes)
router.use('/courses', courseRoutes)
router.use('/scores', scoreRoutes)
router.use('/students2Courses', student2CourseRoutes)
router.use('/subjects', subjectRoutes)
router.use('/users', userRoutes)

router.use('/setup', setupRoute)

export default router