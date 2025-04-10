import {Router} from "express";
import { showProfiles,showProfileById, addProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";

const router=Router();
const apiName='/profile';

router.route(apiName)
    .get(showProfiles) // Get all profile
    .post(addProfile); // Add profile


router.route(`${apiName}/:id`)
    .get(showProfileById) //GET profile by Id
    .put(updateProfile)//Update profile by id
    .delete(deleteProfile); //Delete profile by id

export default router;