import React from 'react'
import { Form } from './Pages/Form'
import { ShowDetails } from './Pages/ShowDetails';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router=createBrowserRouter([
      {path:'/',element:<Form/>},
      {path:'/employees',element:<ShowDetails/>},
      {path:'/form/:id', element:<Form/>}
    ])
function App() {
  return (
    
    <RouterProvider router={router}/>

  )
}

export default App;