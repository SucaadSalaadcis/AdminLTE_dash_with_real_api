import { Route, Routes } from 'react-router-dom'

import Index from '../Index'



// examples
import Forgot_password_v2 from '../pages/examples/Forgot_password_v2'
import Login_v2 from '../pages/examples/Login_v2'
import Recover_password_v2 from '../pages/examples/Recover_password_v2'
import Register_v2 from '../pages/examples/Register_v2'


import { Toaster } from 'react-hot-toast';


// tables
import Users from '../pages/tables/userManage/Users'
import UpdateUser from '../pages/tables/userManage/UpdateUser'
import RegisterUser from '../pages/tables/userManage/RegisterUser'

import Roles from '../pages/tables/rolesManage/Roles'
import RegisterRole from '../pages/tables/rolesManage/RegisterRole'
import UpdateRole from '../pages/tables/rolesManage/UpdateRole'

import Permission from '../pages/tables/permisionManage/Permision'
import UpdatePermision from '../pages/tables/permisionManage/UpdatePermision'
import RegisterPermision from '../pages/tables/permisionManage/RegisterPermision'

import Products from '../pages/tables/productManage/Products'
import UpdateProduct from '../pages/tables/productManage/UpdateProduct'
import RegisterProduct from '../pages/tables/productManage/RegisterProduct'

import Customer from '../pages/tables/customerManage/Customer'
import RegisterCust from '../pages/tables/customerManage/RegisterCust'
import UpdateCust from '../pages/tables/customerManage/UpdateCust'

import Agent from '../pages/tables/agentManage/Agent'
import RegisterAgent from '../pages/tables/agentManage/RegisterAgent'
import UpdateAgent from '../pages/tables/agentManage/UpdateAgent'
import Order from '../pages/tables/orderManage/Order'
import RegisterOrder from '../pages/tables/orderManage/RegisterOrder'
import UpdateOrder from '../pages/tables/orderManage/UpdateOrder'
import VeiwPermision from '../pages/tables/permisionManage/ViewPermision'
import VeiwProduct from '../pages/tables/productManage/ViewProduct'
import ViewAgent from '../pages/tables/agentManage/ViewAgent'
import ViewCust from '../pages/tables/customerManage/ViewCust'
import ViewOrder from '../pages/tables/orderManage/ViewOrder'
import ViewUser from '../pages/tables/userManage/ViewUser'




export default function App() {
  return (
    <>
      <Routes>
        {/* home */}
        <Route path='/' element={<Index />} />


        {/* tables */}
        <Route path='/user-management/permission' element={<Permission />} />
        <Route path='/permission/:id' element={<UpdatePermision />} />
        <Route path='/user-management/permissions/create' element={<RegisterPermision />} />
        <Route path='/veiw_permision/:id' element={<VeiwPermision />} />

        <Route path='/role/:id' element={<UpdateRole />} />
        <Route path='/user-management/roles' element={<Roles />} />
        <Route path='/user-management/roles/create' element={<RegisterRole />} />

        <Route path='/user-management/users' element={<Users />} />
        <Route path='/user/:id' element={<UpdateUser />} />
        <Route path='/user-management/users/create' element={<RegisterUser />} />
        <Route path='/view_user/:id' element={<ViewUser />} />
        
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<UpdateProduct />} />
        <Route path='/product/create' element={<RegisterProduct />} />
        <Route path='/view_product/:id' element={<VeiwProduct />} />

        <Route path='/customers' element={<Customer />} />
        <Route path='/customer/:id' element={<UpdateCust />} />
        <Route path='/customer/create' element={<RegisterCust />} />
        <Route path='/veiw_cust/:id' element={<ViewCust />} />

        <Route path='/agents' element={<Agent />} />
        <Route path='/agent/:id' element={<UpdateAgent />} />
        <Route path='/agent/create' element={<RegisterAgent />} />
        <Route path='/view_agent/:id' element={<ViewAgent />} />

        <Route path='/orders' element={<Order />} />
        <Route path='/order/:id' element={<UpdateOrder />} />
        <Route path='/order/create' element={<RegisterOrder />} />
        <Route path='/view_order/:id' element={<ViewOrder />} />




        {/* exmaple */}
        <Route path='/example/forgot_password_v2' element={<Forgot_password_v2 />} />
        <Route path='/example/login_v2' element={<Login_v2 />} />
        <Route path='/example/recover_password_v2/:token' element={<Recover_password_v2 />} />
        <Route path='/example/register_v2' element={<Register_v2 />} />




      </Routes>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            // background: 'green',

          },
        }}
      />

    </>
  )
}
