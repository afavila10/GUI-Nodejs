/**
*Author: 	DIEGO CASALLAS
*Date:		03/26/2025  
*Description:	Index file for the API - NODEJS
**/
import {Router} from 'express';
import {showDocuments,showDocumentById,addDocument,updateDocument,deleteDocument} from '../controllers/documentController.js';

const router=Router();
const apiName='/document';

router.route(apiName)
  .get(showDocuments)  // Get all user
  .post(addDocument); // Add user

router.route(`${apiName}/:id`)
  .get(showDocumentById)  // Get user by Id
  .put(updateDocument)  // Update user by Id
  .delete(deleteDocument); // Delete user by Id

export default router;