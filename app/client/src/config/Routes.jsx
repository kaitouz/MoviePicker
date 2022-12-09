import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import Home from '../pages/home/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/detail/Detail'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route
                    path='/:category/search/:keyword'
                    element={<Catalog title='Movies' />}
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
            </Switch>
        </div>
    )
}

export default Routes