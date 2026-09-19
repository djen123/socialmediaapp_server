import { Router } from 'express'
import { fetchNetworkSuggestions, fetchConnections, createConnectionRequest, acceptConnectionRequest } from '../controllers/network.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', isAuthenticated, fetchNetworkSuggestions)
router.get('/connections', isAuthenticated, fetchConnections)
router.post('/connections', isAuthenticated, createConnectionRequest)
router.post('/connections/accept', isAuthenticated, acceptConnectionRequest)

export default router