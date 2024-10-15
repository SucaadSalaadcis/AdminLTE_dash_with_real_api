import { Link } from 'react-router-dom';
import RefreshPage from '../../../src/RefreshPage';
import { IoIosLogOut, IoMdEye } from 'react-icons/io';
import Logout from '../../examples/Logout';
import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from '../reusible/Sidebar';
import { MdAddBox, MdDelete } from "react-icons/md";

import { GridLoader } from 'react-spinners';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

import axiosPublicURL from '../../../src/hooks/AxiosHook';

export default function Order() {

    const useAxios = axiosPublicURL();

    const [loading, setLoading] = useState(false); // Loading state

    const getToken = () => {
        return Cookies.get('token'); // cookie name
    };

    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAllData = async (page = 1) => {
        try {

            setLoading(true);

            const response = await useAxios.get(`api/v1/orders?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = response.data.data || [];
            const lastPage = response.data.last_page || 1; // Get the total number of pages

            setOrdersData(data);
            setTotalPages(lastPage); // Set total pages
            setCurrentPage(page); // Set the current page

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    // Fetch data whenever the currentPage changes
    useEffect(() => {
        handleAllData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (ordersData.length > 0 && !$.fn.DataTable.isDataTable('#example1')) {
            const table = $('#example1').DataTable({
                responsive: true,
                lengthChange: false,
                autoWidth: false,
                paging: false,
                search: true,
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
            });

            table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        }
    }, [loading]);


    // delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.delete(`api/v1/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded', //
                    },
                }).then(() => {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Data has been deleted.",
                        icon: "success"
                    });
                    handleAllData();
                }).catch((err) => {
                    Swal.fire("Not Deleted!", err.message, "error");
                });
            }
        });
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

                                <li class="nav-item"><Link to={'/'} onClick={RefreshPage} class="nav-link">  <i class="nav-icon fas fa-tachometer-alt"></i>  <p>Dashboard</p> </Link></li>

                                <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon fas fa-table"></i><p> UserManagement<i class="fas fa-angle-left right"></i> </p> </a>
                                    <ul class="nav nav-treeview">
                                        <li class="nav-item"><Link to={'/user-management/permission'} class="nav-link"> <i class="far fa-circle nav-icon"></i><p>Permissions</p></Link> </li>
                                        <li class="nav-item"> <Link to={'/user-management/roles'} class="nav-link"><i class="far fa-circle nav-icon"></i>   <p>Roles</p> </Link></li>
                                        <li class="nav-item"> <Link to={'/user-management/users'} class="nav-link">  <i class="far fa-circle nav-icon"></i>    <p>Users</p>  </Link></li>
                                    </ul>
                                </li>

                                <li class="nav-item"><Link to={'/products'} class="nav-link"> <i class="nav-icon fas fa-tree"></i> <p>Product</p></Link>  </li>
                                <li class="nav-item">  <Link to={'/customers'} class="nav-link"> <i class="far fa-user nav-icon"></i>   <p>Customer</p>  </Link> </li>
                                <li class="nav-item"><Link to={'/agents'} class="nav-link"><i class="nav-icon far fa-plus-square"></i><p>Agent</p> </Link> </li>
                                <li class="nav-item"><Link to={'/orders'} class="nav-link active"><i class="nav-icon fas fa-ellipsis-h"></i><p>Order</p></Link></li>

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
                    <Content_Header title={'Order'} link={'Home'} />

                    {/* the register btn */}
                    <Link to={'/order/create'}>
                        <button class="btn btn-primary ml-3">
                            <MdAddBox style={{ fontSize: '30px' }} />
                        </button>
                    </Link>

                    {/* <!-- Main content --> */}
                    <section class="content" style={{ marginTop: '20px' }}>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">

                                    {/* <!-- /.card --> */}

                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">DataTable with default features</h3>
                                        </div>
                                        {/* <!-- /.card-header --> */}
                                        <div class="card-body">
                                            <div className="card-body">
                                                <table id="example1" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Customer</th>
                                                            <th>Agent</th>
                                                            <th>Product Price</th>
                                                            <th>Product Commission</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan={7} style={{ textAlign: 'center', height: '100px', verticalAlign: 'middle' }}>
                                                                    <GridLoader color="#007BFF" loading={loading} size={15} />
                                                                </td>
                                                            </tr>

                                                        ) : (

                                                            ordersData.map((order, index) => (
                                                                <tr key={index}>
                                                                    <td>{order.product && order.product.name ? order.product.name : 'Not Assigned'}</td>
                                                                    <td>{order.customer && order.customer[0] ? order.customer[0].fullname : 'Not Assigned'}</td>
                                                                    <td>{order.agent && order.agent[0] ? order.agent[0].fullname : 'Not Assigned'}</td>
                                                                    <td>{order.product_price && order.product_price.price ? order.product_price.price : 'Not Assigned'}</td>
                                                                    <td>{order.product_commission && order.product_commission.commission ? order.product_commission.commission : 'Not Assigned'}</td>
                                                                    <td>{order.status_label ? order.status_label : 'Not Assigned'}</td>

                                                                    {/* actions */}
                                                                    <td>
                                                                        <Link to={`/view_order/${order.id}`}>
                                                                            <span style={{ marginRight: '4px' }}>
                                                                                <IoMdEye className='text-lg text-blue' />
                                                                            </span>
                                                                        </Link>

                                                                        <span style={{ marginRight: '4px' }}>
                                                                            <Link to={`/order/${order.id}`}>
                                                                                <FaEdit className='text-lg text-green' style={{ cursor: 'pointer' }} />
                                                                            </Link>
                                                                        </span>


                                                                        <span>
                                                                            <MdDelete className='text-lg text-red' style={{ cursor: 'pointer' }} onClick={() => handleDelete(order.id)} />
                                                                        </span>

                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}

                                                    </tbody>
                                                </table>


                                                {/* Pagination Controls */}

                                                <div className="d-flex justify-content-end align-items-center my-4">
                                                    <button
                                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                        style={{ backgroundColor: currentPage === 1 ? '#ccc' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', marginRight: '5px', }}>
                                                        Previous
                                                    </button>
                                                    <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                                                    <button
                                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                        disabled={currentPage === totalPages}
                                                        style={{ backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
                                                        Next
                                                    </button>
                                                </div>


                                            </div>

                                        </div>
                                        {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                            {/* <!-- /.row --> */}
                        </div>
                        {/* <!-- /.container-fluid --> */}
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
