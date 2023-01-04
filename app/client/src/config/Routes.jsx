import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import Home from '../pages/home/Home'
import Catalog from '../pages/catalog/Catalog'
import Detail from '../pages/detail/Detail'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import Setting from '../pages/setting/Setting'
import UserBookmark from '../pages/bookmark/UserBookmark'


const Routes = () => {
    return (
        <div>
            <Switch>
                <Route
                    path='/:category/search/:keyword'
                    element={<Catalog title='movies' />}
                />
                <Route
                    path='/:category/genre/:id'
                    element={<Catalog title='genre' />}
                />
                <Route
                    path='/:category/:id'
                    element={<Detail />}
                />
                <Route
                    path='/:category'
                    element={<Catalog />}
                />
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/login'
                    element={<Login />}
                />
                <Route
                    path='/signup'
                    element={<Signup />}
                />
                <Route
                    path='/setting'
                    element={<Setting/>}
                />
                <Route 
                    path='/bookmark'
                    element={<UserBookmark/>}
                />
            </Switch>
        </div>
    )
}

export default Routes