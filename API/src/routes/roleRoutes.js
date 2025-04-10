/**
*Author: 	DIEGO CASALLAS
*Date:		03/26/2025  
*Description:	Index file for the API - NODEJS
**/
import {Router} from 'express';
import {showRoles,showRoleById,addRole,updateRole,deleteRole} from '../controllers/roleController.js';

const router=Router();
const apiName='/role';

router.route(apiName)
  .get(showRoles)  // Get all Role
  .post(addRole); // Add Role

router.route(`${apiName}/:id`)
  .get(showRoleById)  // Get Role by Id
  .put(updateRole)  // Update Role by Id
  .delete(deleteRole); // Delete Role by Id

export default router;