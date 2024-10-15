import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';

import { useDispatch } from "react-redux";
import { setRolesData, } from "../../redux/AuthSlice";

import Cookies from 'js-cookie';
import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from "../reusible/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import RefreshPage from "../../../src/RefreshPage";
import Logout from "../../examples/Logout";
import { IoIosLogOut } from "react-icons/io";

import axiosPublicURL from '../../../src/hooks/AxiosHook';


export default function RegisterUser() {


    const [title, setTitle] = useState("");

    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    // console.log(selectedPermissions) ;  tracks the id of every permision [1,2,3] you choose


    const useAxios = axiosPublicURL();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getToken = () => {
        return Cookies.get('token');
    };


    // get permissions
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await useAxios.get('api/v1/roles/create', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                    },
                });
                setPermissions(response.data.meta.permissions); // Make sure this is correct
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        fetchPermissions();
    }, []);

    // Function to get permission title by ID
    const getPermissionTitle = (id) => {
        const permission = permissions.find((perm) => perm.id === id);
        // console.log(permission); {id: 2, title: 'permission_create'}
        return permission ? permission.title : 'Unknown Permission'; // Handle cases where permission is not found
    };
    // console.log(permissions);

    // post 
    const handlePost = async (e) => {
        e.preventDefault();


        const data = {
            title: title,
            permissions: selectedPermissions.map((id) => ({
                id: id,
                title: getPermissionTitle(id)
                // If you call getPermissionTitle(2), it will find the object { id: 2, title: 'permission_create' }.

            })),
        };

        try {
            const response = await useAxios.post(
                "api/v1/roles",
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            if (response.data) {
                toast.success('Registered Successfully...');
                // console.log(response.data.data)
                //   The optional chaining operator (?.) is used here to safely access the roles property. If response.data.data is undefined or null, the expression will not throw an error and will simply evaluate to undefined. This prevents runtime errors when trying to access properties of undefined
                const rolesData = response.data.data?.roles || [];
                dispatch(setRolesData(rolesData));
                navigate('/user-management/roles');
            }
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            toast.error('Failed to register. Please try again.');
        }
    };





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

                                <li class="nav-item menu-open"><a href="#" class="nav-link active"><i class="nav-icon fas fa-table"></i><p>UserManagement<i class="fas fa-angle-left right"></i></p></a>

                                    <ul class="nav nav-treeview">
                                        <li class="nav-item"><Link to={'/user-management/permission'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Permissions</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/roles'} class="nav-link active"><i class="far fa-circle nav-icon"></i><p>Roles</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/users'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Users</p></Link></li>
                                    </ul>

                                </li>

                                <li class="nav-item"><Link to={'/products'} class="nav-link"><i class="nav-icon fas fa-tree"></i><p>Product</p></Link></li>
                                <li class="nav-item"><Link to={'/customers'} class="nav-link"><i class="far fa-user nav-icon"></i><p>Customer</p></Link></li>
                                <li class="nav-item"><Link to={'/agents'} class="nav-link"><i class="nav-icon far fa-plus-square"></i><p>Agent</p></Link></li>
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
                    <Content_Header title={'Roles'} link={'Home'} />

                    {/* <!-- Main content --> */}
                    <section class="content pt-5 pb-5">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                {/* <!-- left column --> */}
                                <div class="col-md-10">
                                    {/* <!-- Horizontal Form --> */}
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Create Role</h3>
                                        </div>

                                        {/* <!-- form start --> */}
                                        <form class="form-horizontal">
                                            <div class="card-body">
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Title</label>
                                                    <div class="col-sm-20">
                                                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Title" />
                                                    </div>
                                                </div>
                                                {/* permmision */}
                                                <div class="form-group row">
                                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Permissions :</label>
                                                    <div class="col-sm-20" >
                                                        <Select
                                                            isMulti //  allowing users to select more than one permission
                                                            options={permissions.map(permission => ({
                                                                value: permission.id,
                                                                label: permission.title
                                                            }))}
                                                            onChange={(selectedOptions) => {
                                                                setSelectedPermissions(selectedOptions.map(option => option.value)); // Update state with selected IDs
                                                            }}
                                                            value={selectedPermissions.map(id => ({
                                                                value: id,
                                                                label: getPermissionTitle(id) // Ensure the title is fetched correctly
                                                            }))}
                                                            placeholder="Select permission(s)"
                                                            styles={{
                                                                control: (base) => ({
                                                                    ...base,
                                                                    border: '2px solid #6c757d',
                                                                    borderRadius: '8px',
                                                                    padding: '5px',
                                                                }),
                                                                placeholder: (base) => ({
                                                                    ...base,
                                                                    color: '#495057',
                                                                    fontSize: '16px',
                                                                    padding: '8px',
                                                                }),
                                                            }}
                                                        />


                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer justify-content-between">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handlePost}>Create</button>
                                            </div>
                                            {/* <!-- /.card-footer --> */}
                                        </form>
                                    </div>
                                    {/* <!-- /.card --> */}

                                </div>

                            </div>
                            {/* <!-- /.row --> */}
                        </div>
                    </section>
                    {/* <!-- /.content --> */}

                </div>
                {/* <!-- /.content-wrapper --> */}

                {/* footer */}
                <Footer />

            </div>
            {/* <!-- ./wrapper --> */}


        </div>
    )
}
