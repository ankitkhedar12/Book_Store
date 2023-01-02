import { Routes, Route } from 'react-router-dom';
import Admin from '../components/admin/adminPage';
import ReqList from '../components/admin/bookRequests/BookRequstsList';
import AddBook from '../components/admin/booksList/AddBooks';
import BooksList from '../components/admin/booksList/BooksList';
import UsersList from '../components/admin/usersList/UsersList';
import Home from '../components/Home';
import Login from '../components/login/Login'
import { NoMatch } from '../components/pageNotFound';
import Signup from '../components/signup/Signup';
import UserProfile from '../components/user/UserProfile';
import UserReqList from '../components/user/UserReqList';
import { PrivateRouteLogic } from './PrivateRouteLogic';

export default function PublicRoutes  ()  {
    return (
        <>
            <Routes>

                { /** Public Routes */ }
                <Route path="/signin" element={<Login/>} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Home/>} />
                <Route path='*' element={ <NoMatch/> } />

                { /** Private Routes */ }
                <Route
                    path="/userprofile"
                    element={
                        <PrivateRouteLogic>
                            <UserProfile/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRouteLogic>
                            <Admin/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <PrivateRouteLogic>
                            <UsersList/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/admin/books"
                    element={
                        <PrivateRouteLogic>
                            <BooksList/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/admin/requests"
                    element={
                        <PrivateRouteLogic>
                            <ReqList/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/user/requests"
                    element={
                        <PrivateRouteLogic>
                            <UserReqList/>
                        </PrivateRouteLogic>
                    }
                />
                <Route
                    path="/admin/addBook"
                    element={
                        <PrivateRouteLogic>
                            <AddBook/>
                        </PrivateRouteLogic>
                    }
                />

            </Routes>
        </>
    );
};