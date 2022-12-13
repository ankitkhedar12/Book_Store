import express, {Router} from 'express';
import { AddBooks } from '../controllers/AddBooks';
import authUser from '../middlewares/auts';
import authAdmin from '../middlewares/adminAuth';
import { BooksList } from '../controllers/BooksList';
import { DeleteBooks } from '../controllers/DeleteBooks';
import { EditStatus } from '../controllers/EditStatus';
import { EditUserStatus } from '../controllers/EditUserStatus';
import { IssueBook } from '../controllers/IssueBook';
import { ReqList } from '../controllers/ReqList';
import { SearchBook } from '../controllers/SearchBook';
import { Signin } from '../controllers/Signin'
import { Signup } from '../controllers/Signup';
import { UsersList } from '../controllers/UserList';
import { UserReqList } from '../controllers/UserReqList';

const router = Router();

router.route('/signup').post( Signup );
router.route('/signin').post( Signin );
router.route('/addbooks').post(authAdmin, AddBooks );
router.route('/deletebooks').post(authAdmin, DeleteBooks );
router.route('/issuebook').post(authUser, IssueBook );      //create Book Issue Request
router.route('/editstatus').put(authAdmin, EditStatus );    //Edit Status of Issue Request
router.route('/requestslist').get(authAdmin, ReqList );
router.route('/userrequestslist').get(authUser, UserReqList );      //Fetch Issue Requests
router.route('/userslist').get(authAdmin, UsersList );
router.route('/admin/books' ).get(authAdmin, BooksList );
router.route('/admin/edituserstatus').put(authAdmin, EditUserStatus )
router.route('/user/books' ).get(authUser, BooksList );
router.route('/user/searchbook').post(authUser, SearchBook )

export default router;