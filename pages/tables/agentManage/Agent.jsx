
import { Link } from 'react-router-dom'
import RefreshPage from '../../../src/RefreshPage'
import { IoIosLogOut } from 'react-icons/io'
import Logout from '../../examples/Logout'

import Reusible_data_table from '../reusible/Reusible_data_table'
import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from '../reusible/Sidebar'
import { MdAddBox } from "react-icons/md";


import { setAgentData } from '../../redux/AuthSlice'

export default function Agent() {

    // Define the columns based on the structure of your data
    const columns = ['id', 'fullname', 'description', 'business', 'phone'];


    return (
        <div class="hold-transition sidebar-mini">
            <div class="wrapper">
                {/* <!-- Navbar --> */}
                <Navbar navImg1={'../../dist/img/user1-128x128.jpg'} navImg2={'../../dist/img/user8-128x128.jpg'} navImg3={'../../dist/img/user3-128x128.jpg'} />
                {/* <!-- /.navbar --> */}

                {/* <!-- Main Sidebar Container --> */}
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                    {/* <!-- Brand Logo --> */}
                    <BrandLogo />

                    <div className="sidebar">
                        {/* userPanel */}
                        <UserPanel />

                        {/* sidebarSearch Form  */}
                        <SearchForm />

                        {/* <!-- Sidebar Menu --> */}
                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* <!-- Add icons to the links using the .nav-icon class
                                   with font-awesome or any other icon font library --> */}

                                <li class="nav-item"><Link to={'/'} onClick={RefreshPage} class="nav-link"><i class="nav-icon fas fa-tachometer-alt"></i><p>Dashboard</p></Link></li>

                                <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon fas fa-table"></i> <p>UserManagement<i class="fas fa-angle-left right"></i></p></a>

                                    <ul class="nav nav-treeview">
                                        <li class="nav-item"><Link to={'/user-management/permission'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Permissions</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/roles'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Roles</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/users'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Users</p></Link></li>
                                    </ul>

                                    </li>

                                <li class="nav-item"><Link to={'/products'} class="nav-link"><i class="nav-icon fas fa-tree"></i><p>Product</p></Link></li>
                                <li class="nav-item"><Link to={'/customers'} class="nav-link"><i class="far fa-user nav-icon"></i><p>Customer</p></Link></li>
                                <li class="nav-item"><Link to={'/agents'} class="nav-link active"><i class="nav-icon far fa-plus-square"></i><p>Agent</p></Link></li>
                                <li class="nav-item"><Link to={'/orders'} class="nav-link "><i class="nav-icon fas fa-ellipsis-h"></i><p>Order</p></Link></li>

                                <li class="nav-item">
                                    <a class="nav-link">
                                        <IoIosLogOut style={{ color: "white", fontSize: "20px", marginLeft: '5px' }} />
                                        <p style={{ cursor: 'pointer' }}><Logout /></p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- /.sidebar-menu --> */}
                    </div>
                    {/* <!-- /.sidebar --> */}
                </aside>
                {/* <!-- Content Wrapper. Contains page content --> */}
                <div class="content-wrapper">

                    {/* <!-- Content Header (Page header) --> */}
                    <Content_Header title={'Agent'} link={'Home'} />

                    {/* the register btn */}
                    <Link to={'/agent/create'}>
                        <button class="btn btn-primary ml-3">
                            <MdAddBox style={{ fontSize: '30px' }} />
                        </button>
                    </Link>


                    {/* <!-- Main content --> */}
                    <section class="content">
                        <div class="card-body">
                            {/* <Reusible_data_table columns={columns} url={'auth/getAllUsers'}/> */}
                            <Reusible_data_table columns={columns} url={'api/v1/agents'} dispatchAction={setAgentData} dataKey="agents" />
                        </div>
                    </section>



                </div>
                {/* <!-- /.content-wrapper --> */}

                {/* footer */}
                <Footer />

            </div>
            {/* <!-- ./wrapper --> */}

        </div>
    )
}