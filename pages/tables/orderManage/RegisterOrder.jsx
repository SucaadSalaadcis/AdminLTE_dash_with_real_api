import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';

import Cookies from 'js-cookie';
import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from "../reusible/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import RefreshPage from "../../../src/RefreshPage";
import Logout from "../../examples/Logout";
import { IoIosLogOut } from "react-icons/io";

import axiosPublicURL from '../../../src/hooks/AxiosHook';

export default function RegisterOrder() {

    const useAxios = axiosPublicURL();

    const getToken = () => Cookies.get('token');

    // State management
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [productPrices, setProductPrices] = useState([]);
    const [productCommisions, setProductCommisions] = useState([]);

    const [selectedOrders, setSelectedOrders] = useState([]);

    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState([]);

    const [selectedProductPrice, setSelectedProductPrice] = useState(null);
    const [selectedProductCommision, setSelectedProductCommision] = useState(null);

    const [selectedProduct_price_id, setSelectedProduct_price_id] = useState('');
    const [selectedProduct_commission_id, setSelectedProduct_commission_id] = useState('');
    const [selectStatus, setSelectedStatus] = useState('');
    const [selectProduct_id, setSelectedProduct_id] = useState('');
    const [ownerId, setOwnerId] = useState('');


    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await useAxios.get('api/v1/orders/create', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                setOrders(orderResponse.data.meta.product || []);
                setProductPrices(orderResponse.data.meta.product_price || []);
                setProductCommisions(orderResponse.data.meta.product_commission || []);

                const customerResponse = await useAxios.get('api/v1/customers', {
                    headers: { 'Authorization': `Bearer ${getToken()}` },
                });
                setCustomers(customerResponse.data.data);

                const agentResponse = await useAxios.get('api/v1/agents', {
                    headers: { 'Authorization': `Bearer ${getToken()}` },
                });
                setAgents(agentResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);




    const postOrderData = async (e) => {
        e.preventDefault();

        // Ensure selectedCustomer and selectedAgent are arrays before mapping
        const customerArray = Array.isArray(selectedCustomer)
            ? selectedCustomer.map(cust => ({
                id: cust.value,
                fullname: cust.label, // Assuming the label contains the fullname
            }))
            : [];

        const agentArray = Array.isArray(selectedAgent)
            ? selectedAgent.map(ag => ({
                id: ag.value,
                fullname: ag.label, // Assuming the label contains the fullname
            }))
            : [];

        // Construct the data based on selected values
        const data = {
            product_price_id: selectedProductPrice?.value || '',
            product_commission_id: selectedProductCommision?.value || '',
            owner_id: ownerId || '', // Assuming you have an owner ID available
            agent: agentArray, // Array of agent objects
            customer: customerArray, // Array of customer objects
            product_id: selectProduct_id || '',
            status: selectStatus || '', // Changed from status_label to status
        };

        console.log('data:', data);  

        try {
            const response = await useAxios.post(
                `api/v1/orders`, // Ensure this is the correct endpoint for creating/updating orders
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json', // Use JSON for this API
                    },
                }
            );

            console.log('Order updated successfully:', response.data);
            toast.success("Order updated successfully!");
            navigate('/orders');
        } catch (err) {
            console.error('Error updating order:', err);

            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                console.log('Validation errors:', errors);
                toast.error(`Failed to update order: ${JSON.stringify(errors)}`);
            } else {
                toast.error("An unexpected error occurred.");
            }
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
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column">
                                <li className="nav-item"><Link to={'/'} onClick={RefreshPage} className="nav-link">  <i className="nav-icon fas fa-tachometer-alt"></i>  <p>Dashboard</p> </Link></li>
                                <li className="nav-item"><a href="#" className="nav-link"><i className="nav-icon fas fa-table"></i><p>User Management<i className="fas fa-angle-left right"></i></p></a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item"><Link to={'/user-management/permission'} className="nav-link"><i className="far fa-circle nav-icon"></i><p>Permissions</p></Link></li>
                                        <li className="nav-item"><Link to={'/user-management/roles'} className="nav-link"><i className="far fa-circle nav-icon"></i><p>Roles</p></Link></li>
                                        <li className="nav-item"><Link to={'/user-management/users'} className="nav-link"><i className="far fa-circle nav-icon"></i><p>Users</p></Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><Link to={'/products'} className="nav-link"><i className="nav-icon fas fa-tree"></i><p>Product</p></Link></li>
                                <li className="nav-item"><Link to={'/customers'} className="nav-link"><i className="far fa-user nav-icon"></i><p>Customer</p></Link></li>
                                <li className="nav-item"><Link to={'/agents'} className="nav-link"><i className="nav-icon far fa-plus-square"></i><p>Agent</p></Link></li>
                                <li className="nav-item"><Link to={'/orders'} className="nav-link active"><i className="nav-icon fas fa-ellipsis-h"></i><p>Order</p></Link></li>
                                <li className="nav-item">
                                    <a className="nav-link">
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

                    {/* <!-- Main content --> */}
                    <section class="content pt-5 pb-5">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                {/* <!-- left column --> */}
                                <div class="col-md-10">
                                    {/* <!-- Horizontal Form --> */}
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Create Order</h3>
                                        </div>

                                        <form onSubmit={postOrderData} className="form-horizontal">
                                            <div className="card-body">
                                                {/* products */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Products :</label>
                                                    <div class="col-sm-4">
                                                        <Select options={orders.map(order => ({ value: order.id, label: order.name }))} isMulti value={selectedOrders} onChange={setSelectedOrders} />
                                                    </div>
                                                </div>
                                                {/* customers */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Customer :</label>
                                                    <div class="col-sm-4">

                                                        <Select options={customers.map(cust => ({ value: cust.id, label: cust.fullname }))} isMulti value={selectedCustomer} onChange={setSelectedCustomer} />
                                                    </div>
                                                </div>
                                                {/* agents */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Agent :</label>
                                                    <div class="col-sm-4">
                                                        <Select options={agents.map(agent => ({ value: agent.id, label: agent.fullname }))} isMulti value={selectedAgent} onChange={setSelectedAgent} />
                                                    </div>
                                                </div>
                                                {/* product price */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Product Price:</label>
                                                    <div class="col-sm-4">
                                                        <Select options={productPrices.map(price => ({ value: price.id, label: `${price.price}` }))} value={selectedProductPrice} onChange={setSelectedProductPrice} />
                                                    </div>
                                                </div>
                                                {/* product commision */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Product Commission:</label>
                                                    <div class="col-sm-4">
                                                        <Select options={productCommisions.map(comm => ({ value: comm.id, label: `${comm.commission}` }))} value={selectedProductCommision} onChange={setSelectedProductCommision} />

                                                    </div>
                                                </div>

                                                {/* product price id */}
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Produt Price ID :</label>
                                                    <div class="col-sm-4">
                                                        <input value={selectedProduct_price_id} onChange={(e) => setSelectedProduct_price_id(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Product price id" />
                                                    </div>
                                                </div>
                                                {/* product commission id */}
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Produt Commission ID :</label>
                                                    <div class="col-sm-4">
                                                        <input value={selectedProduct_commission_id} onChange={(e) => setSelectedProduct_commission_id(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Product commission id" />
                                                    </div>
                                                </div>
                                                {/* product id */}
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Product ID :</label>
                                                    <div class="col-sm-4">
                                                        <input value={selectProduct_id} onChange={(e) => setSelectedProduct_id(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Product id" />
                                                    </div>
                                                </div>

                                                {/* Owner Id */}
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Owner ID :</label>
                                                    <div class="col-sm-4">
                                                        <input value={ownerId} onChange={(e) => setOwnerId(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Owner id" />
                                                    </div>
                                                </div>
                                                {/* status */}
                                                <div class="form-group row">
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Status :</label>
                                                    <div class="col-sm-4">
                                                        <input value={selectStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Status" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-info">Create Order</button>
                                                <Link to="/orders" className="btn btn-default float-right">Cancel</Link>
                                            </div>
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
