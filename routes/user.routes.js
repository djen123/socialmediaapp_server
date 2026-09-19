import { Router } from 'express'
import { fetchUsers, fetchUser, fetchUserByUsername, signupUser, loginUser, logoutUser, getCurrentUser, updateUser, deleteUser, addExperience, deleteExperience, addEducation, deleteEducation } from '../controllers/user.controller.js'
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', fetchUsers)
router.get('/me', isAuthenticated, getCurrentUser)
router.get('/:id', fetchUser)
router.get('/username/:username', fetchUserByUsername)

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.patch('/:id', isAuthenticated, isAuthorized, updateUser)
router.delete('/:id', isAuthenticated, isAuthorized, deleteUser)

router.post('/:id/experience', isAuthenticated, isAuthorized, addExperience)
router.delete('/:id/experience/:experienceId', isAuthenticated, isAuthorized, deleteExperience)

router.post('/:id/education', isAuthenticated, isAuthorized, addEducation)
router.delete('/:id/education/:educationId', isAuthenticated, isAuthorized, deleteEducation)

export default router