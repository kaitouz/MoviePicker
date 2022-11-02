import React from 'react'
import {Route, Routes as Switch} from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail'
import Login from '../pages/login/Login'

const Routes = () => {
  return (
    <div>
        <Switch>
            <Route
                path='/:category/search/:keyword'
                element={<Catalog title='Movies'/>}
            />
            <Route
                path='/:category/:id'
                element={<Detail/>}
            />            
            <Route
                path='/:category'
                element={<Catalog/>}
            />
            <Route
                path='/' 
                element={<Home/>}
            />
            <Route
                path='/login'
                element={<Login action='login'/>}
            />
            <Route
                path='/signup'
                element={<Login action='signup' />}
            />
        </Switch>
    </div>
  )
}

export default Routes