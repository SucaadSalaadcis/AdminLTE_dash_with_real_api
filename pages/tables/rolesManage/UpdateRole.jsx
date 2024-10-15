
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom'
import RefreshPage from '../../../src/RefreshPage'
import { IoIosLogOut } from 'react-icons/io'
import Logout from '../../examples/Logout'

import Select from 'react-select';
import Cookies from 'js-cookie'

import axiosPublicURL from '../../../src/hooks/AxiosHook';

import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from '../../tables/reusible/Sidebar'

import toast from "react-hot-toast";

export default function UpdateRole() {

    const getToken = () => {
        return Cookies.get('token');
    };


    const [title, setTitle] = useState("");

    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const useAxios = axiosPublicURL();
    const params = useParams();
    const navigate = useNavigate();


    // Function to get permission title by ID
    const getPermissionTitle = (id) => {
        const permission = permissions.find((perm) => perm.id === id);
        // console.log(permission); {id: 2, title: 'permission_create'}
        return permission ? permission.title : 'Unknown Permission'; // Handle cases where permission is not found
    };

    // get single data
    useEffect(() => {
        // Fetch role data by ID (params.id)
        useAxios.get(`api/v1/roles/${params.id}/edit`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${getToken()}`,
            },
        })
            .then(res => {
                // Update the state with the current role's title and permissions
                setTitle((res.data.data.title));
                setSelectedPermissions(res.data.data.permissions.map(perm => perm.id)); // Update with existing permissions' IDs
            })
            .catch(err => console.log(err));
    }, [params.id]);



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


    // put
    const handleUpdate = (e) => {
        e.preventDefault();
        useAxios.put(`api/v1/roles/${params.id}`, {
            title: title,
            permissions: selectedPermissions.map((id) => ({
                id: id,
                title: getPermissionTitle(id)
                // If you call getPermissionTitle(2), it will find the object { id: 2, title: 'permission_create' }.

            })),
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/user-management/roles')
        }).catch(err => console.log(err));
    }



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
                    <Content_Header title={'Edit Role'} link={'Home'} />

                    {/* <!-- Main content --> */}
                    <section class="content pt-5 pb-5">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                {/* <!-- left column --> */}
                                <div class="col-md-8">
                                    {/* <!-- Horizontal Form --> */}
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Role Edit Form</h3>
                                        </div>

                                        {/* <!-- form start --> */}
                                        <form class="form-horizontal">
                                            <div class="card-body">
                                                <div class="form-group row">
                                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Title :</label>
                                                    <div class="col-sm-20">
                                                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                                                            type="text" class="form-control" id="inputName3" placeholder="Title" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Permissions :</label>
                                                    <div class="col-sm-20" >
                                                        <Select
                                                            isMulti
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
                                                            }))} // This will set the initial value to the current permissions
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
                                            {/* <!-- /.card-body --> */}
                                            <div class="card-footer">
                                                <button onClick={handleUpdate} type="submit" class="btn btn-info">Update</button>
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
