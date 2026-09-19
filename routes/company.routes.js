import { Router } from 'express'
import { fetchCompanies } from '../controllers/company.controller.js'

const router = Router()

router.get('/', fetchCompanies)

export default router