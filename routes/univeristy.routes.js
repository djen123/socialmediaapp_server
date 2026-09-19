import { Router } from 'express'
import { fetchUniversities } from '../controllers/university.controller.js'

const router = Router()

router.get('/', fetchUniversities)

export default router