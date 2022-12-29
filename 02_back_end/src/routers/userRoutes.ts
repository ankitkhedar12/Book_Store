import {Router} from 'express';
import authUser from '../middlewares/userAuth';
import authAdmin from '../middlewares/adminAuth';

import * as AdminControllers from '../controllers/AdminControllers';
import * as CommonControllers from '../controllers/CommonControllers';
import * as UserControllers from '../controllers/UserControllers';

const router = Router();

//Admin Controllers
router.route('/addbooks').post(authAdmin, AdminControllers.AddBooks );
router.route('/deletebooks').post(authAdmin, AdminControllers.DeleteBooks );
router.route('/editstatus').put(authAdmin, AdminControllers.EditStatus );            //Edit Status of Issue Request
router.route('/requestslist').get(authAdmin, AdminControllers.ReqList );
router.route('/userslist').get(authAdmin, AdminControllers.UsersList );
router.route('/admin/edituserstatus').put(authAdmin, AdminControllers.EditUserStatus )

//Common Controller
router.route('/signup').post( CommonControllers.Signup );
router.route('/signin').post( CommonControllers.Signin );
router.route('/user/books' ).get(authUser, CommonControllers.BooksList );
router.route('/admin/books' ).get(authAdmin, CommonControllers.BooksList );

//User Routes
router.route('/issuebook').post(authUser, UserControllers.IssueBook );              //create Book Issue Request
router.route('/user/searchbook').post(authUser, UserControllers.SearchBook )
router.route('/userrequestslist').post(authUser, UserControllers.MyRequests );      //Fetch Issue Requests

export default router;