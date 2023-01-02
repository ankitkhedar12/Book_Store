import {Router} from 'express';
import authUser from '../middlewares/userAuth';

import * as AdminControllers from '../controllers/AdminControllers';
import * as CommonControllers from '../controllers/CommonControllers';
import * as UserControllers from '../controllers/UserControllers';

const router = Router();

//Admin Controllers
router.route('/addbooks').post(authUser, AdminControllers.AddBooks );
router.route('/deletebooks').post(authUser, AdminControllers.DeleteBooks );
router.route('/editstatus').put(authUser, AdminControllers.EditStatus );            //Edit Status of Issue Request
router.route('/requestslist').get(authUser, AdminControllers.ReqList );
router.route('/userslist').get(authUser, AdminControllers.UsersList );
router.route('/admin/edituserstatus').put(authUser, AdminControllers.EditUserStatus )

//Common Controller
router.route('/signup').post( CommonControllers.Signup );
router.route('/signin').post( CommonControllers.Signin );
router.route('/user/books' ).get(authUser, CommonControllers.BooksList );
router.route('/admin/books' ).get(authUser, CommonControllers.BooksList );

//User Routes
router.route('/issuebook').post(authUser, UserControllers.IssueBook );              //create Book Issue Request
router.route('/user/searchbook').post(authUser, UserControllers.SearchBook )
router.route('/userrequestslist').post(authUser, UserControllers.MyRequests );      //Fetch Issue Requests

export default router;