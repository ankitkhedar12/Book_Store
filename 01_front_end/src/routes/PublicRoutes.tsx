// import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Admin from '../components/admin/adminPage';
// import AddBook from '../components/admin/booksList/AddBooks';
// import BooksList from '../components/admin/booksList/BooksList';
import Home from '../components/Home';
import Login from '../components/login/Login'
import { NoMatch } from '../components/pageNotFound';
// import { PublicRoutes } from './PublicRoutes';
// import { PrivateRoutes } from './PrivateRoutes';
// import ReqList from '../components/admin/bookRequests/BookRequstsList';
import Signup from '../components/signup/Signup';
// import UsersList from '../components/admin/usersList/UsersList';
// import UserReqList from '../components/user/UserReqList';
// import UserProfile from '../components/user/UserProfile';

export default function PublicRoutes  ()  {
    return (
        <>
            <Routes>

                { /** Public Routes */ }
                <Route path="/signin" element={<Login/>} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/userprofile" element={<UserProfile/>} /> */}
                {/* <Route path='/admin' element={<Admin/>} /> */}
                {/* <Route path='/admin/users' element={<UsersList/>} /> */}
                {/* <Route path='/admin/books' element={<BooksList/>} /> */}
                {/* <Route path='/admin/requests' element={<ReqList/>} /> */}
                {/* <Route path='/user/requests' element={<UserReqList/>} /> */}
                {/* <Route path='/admin/addBook' element={<AddBook/>} /> */}

                { /** Private Routes */ }
                {/* <Route
                    path="/userprofile"
                    element={
                        <PrivateRoutes>
                            <UserProfile/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoutes>
                            <Admin/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <PrivateRoutes>
                            <UsersList/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin/books"
                    element={
                        <PrivateRoutes>
                            <BooksList/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin/requests"
                    element={
                        <PrivateRoutes>
                            <ReqList/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/user/requests"
                    element={
                        <PrivateRoutes>
                            <UserReqList/>
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin/addBook"
                    element={
                        <PrivateRoutes>
                            <AddBook/>
                        </PrivateRoutes>
                    }
                /> */}

                <Route path="/" element={<Home/>} />
                <Route path='*' element={ <NoMatch/> } />
            </Routes>
        </>
    );
};