import { Routes, Route } from 'react-router-dom';
import Admin from '../components/admin/adminPage';
import AddBook from '../components/admin/booksList/AddBooks';
import BooksList from '../components/admin/booksList/BooksList';
import { PrivateRouteLogic } from './PrivateRouteLogic';
import ReqList from '../components/admin/bookRequests/BookRequstsList';
import UsersList from '../components/admin/usersList/UsersList';
import UserReqList from '../components/user/UserReqList';
import UserProfile from '../components/user/UserProfile';

export default function PrivateRoutes  ()  {
    return (
        <>
            <Routes>

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