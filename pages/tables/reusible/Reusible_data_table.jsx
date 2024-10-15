
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeOneData } from '../../redux/AuthSlice';
import Cookies from 'js-cookie';
import { IoMdEye } from 'react-icons/io';
import Swal from 'sweetalert2';
import { GridLoader } from 'react-spinners';

import axiosPublicURL from '../../../src/hooks/AxiosHook';


export default function Reusible_data_table({ columns, url, dispatchAction, dataKey }) {

    const location = useLocation();
    const dispatch = useDispatch();

    const useAxios = axiosPublicURL();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false); // Loading state

    const { data } = useSelector((state) => state.data[dataKey]);

    const getToken = () => {
        return Cookies.get('token');
    };




    const handleAllData = async (page = 1) => {
        try {
            setLoading(true); // Set loading to true when starting to fetch data
            const response = await useAxios.get(`${url}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = response.data?.data || [];
            console.log(data); // Ensure data is not empty before initializing DataTables

            const lastPage = response.data.last_page || 1;
            setTotalPages(lastPage);
            setCurrentPage(page);

            if (Array.isArray(data)) {
                dispatch(dispatchAction(data));
            } else {
                console.error('Expected an array but received:', data);
                dispatch(dispatchAction([data]));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        handleAllData(currentPage);
    }, [currentPage]);

    // Delete function
    const handleDelete = (pathLink, id, type) => {
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
                useAxios.delete(`${pathLink}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(() => {
                    dispatch(removeOneData({ id, type }));
                    handleAllData();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your data has been deleted.",
                        icon: "success"
                    });
                }).catch((error) => {
                    console.log("Error deleting the record: ", error);
                });
            }
        });
    };


    useEffect(() => {
        if (data.length > 0 && !$.fn.DataTable.isDataTable('#example1')) {
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



    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">DataTable with default features</h3>
                            </div>
                            <div className="card-body">
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            {columns.map((col, index) => (
                                                <th key={index}>{col}</th>
                                            ))}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={columns.length + 1} className="text-center">
                                                    <GridLoader color="#007BFF" loading={loading} size={15} />
                                                </td>
                                            </tr>
                                        ) : (
                                            data && data.length > 0 ? (
                                                data.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {columns.map((col, i) => (
                                                            <td key={i}>
                                                                {col === 'permissions' ? (
                                                                    <td>
                                                                        {row.permissions.map((permission, index) => (
                                                                            <span key={index}>
                                                                                <button style={{ color: 'white', border: 'none', margin: '4px', borderRadius: '20px', background: '#007BFF', padding: '0 3px 2px 3px' }}>{permission.title}</button>
                                                                            </span>
                                                                        ))}
                                                                    </td>
                                                                ) : (
                                                                    row[col]
                                                                )}
                                                            </td>
                                                        ))}
                                                        <td className='ml'>
                                                            <span style={{ marginRight: '10px' }}>
                                                                {

                                                                    location.pathname === '/user-management/permission' ? <Link to={`/veiw_permision/${row.id}`}>
                                                                        <IoMdEye className='text-lg text-blue' />
                                                                    </Link> : location.pathname === '/products' ? <Link to={`/view_product/${row.id}`}>
                                                                        <IoMdEye className='text-lg text-blue' />
                                                                    </Link> : location.pathname === '/agents' ? <Link to={`/view_agent/${row.id}`}>
                                                                        <IoMdEye className='text-lg text-blue' />
                                                                    </Link> : location.pathname === '/customers' ? <Link to={`/veiw_cust/${row.id}`}>
                                                                        <IoMdEye className='text-lg text-blue' />
                                                                    </Link> : location.pathname === '/user-management/users' ? <Link to={`/view_user/${row.id}`}>
                                                                        <IoMdEye className='text-lg text-blue' />
                                                                    </Link> : ''
                                                                }


                                                            </span>


                                                            {/* Update Icon with Action */}
                                                            <span style={{ marginRight: '10px' }}>
                                                                {
                                                                    location.pathname === '/user-management/permission' ? <Link to={`/permission/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : location.pathname === '/user-management/roles' ? <Link to={`/role/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : location.pathname === '/user-management/users' ? <Link to={`/user/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : location.pathname === '/products' ? <Link to={`/product/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : location.pathname === '/customers' ? <Link to={`/customer/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : location.pathname === '/agents' ? <Link to={`/agent/${row.id}`}>
                                                                        <FaEdit className='text-lg text-green' />
                                                                    </Link> : ''
                                                                }

                                                            </span>



                                                            {/* Delete Icon with Action */}
                                                            <span>
                                                                {
                                                                    location.pathname === '/user-management/permission' ?
                                                                        <MdDelete onClick={() => handleDelete('api/v1/permissions', row.id, 'permision')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                        : location.pathname === '/user-management/roles' ?
                                                                            <MdDelete onClick={() => handleDelete('api/v1/roles', row.id, 'role')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                            : location.pathname === '/user-management/users' ?
                                                                                <MdDelete onClick={() => handleDelete('api/v1/users', row.id, 'user')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                                : location.pathname === '/products' ?
                                                                                    <MdDelete onClick={() => handleDelete('api/v1/products', row.id, 'product')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                                    : location.pathname === '/customers' ?
                                                                                        <MdDelete onClick={() => handleDelete('api/v1/customers', row.id, 'customer')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                                        : location.pathname === '/agents' ?
                                                                                            <MdDelete onClick={() => handleDelete('api/v1/agents', row.id, 'agent')} className='text-lg text-red' style={{ cursor: 'pointer' }} />
                                                                                            : ''
                                                                }
                                                            </span>


                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={columns.length + 1} className="text-center">No Data Available</td>
                                                </tr>
                                            )
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
                    </div>
                </div>
            </div>
        </section>
    )
}
