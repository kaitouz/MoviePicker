import React from 'react'
import {Route, Routes as Switch} from 'react-router-dom'

import Home from '../components/pages/Home'
import Catalog from '../components/pages/Catalog'
import Detail from '../components/pages/Detail'
import Login from '../components/login/Login'

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
                element={<Login/>}
            />
        </Switch>
    </div>
  )
}

export default Routes