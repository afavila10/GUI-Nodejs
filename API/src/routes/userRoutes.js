
import {Router} from 'express';
import {showUser,showUserId,addUser,updateUser,deleteUser} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const router=Router();
const apiName='/user';

router.route(apiName)
  .get(verifyToken,showUser)
  .post(addUser) // Add user
  

router.route(`${apiName}/:id`)
  .get(showUserId)  // Get user by Id
  .put(updateUser)  // Update user by Id
  .delete(deleteUser); // Delete user by Id

export default router;