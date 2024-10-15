import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';

import axiosPublicURL from '../../../src/hooks/AxiosHook';

import Cookies from 'js-cookie';

import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from "../reusible/Sidebar";
import { Link, useParams } from "react-router-dom";
import RefreshPage from "../../../src/RefreshPage";
import Logout from "../../examples/Logout";
import { IoIosLogOut } from "react-icons/io";



export default function ViewOrder() {


    const getToken = () => Cookies.get('token');

    const useAxios = axiosPublicURL();

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


    const [selectStatus, setSelectedStatus] = useState('');

    const params = useParams();
   

    // Fetch all data
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


    // edit data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await useAxios.get(
                    `api/v1/orders/${params.id}/edit`,
                    {
                        headers: {
                            'Authorization': `Bearer ${getToken()}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                const order = response.data.data;

                // Safely checking if data exists before setting state
                if (order?.product) {
                    setSelectedOrders([{ value: order.product.id, label: order.product.name }]);
                }

                if (order?.customer?.length > 0) {
                    setSelectedCustomer({ value: order.customer[0].id, label: order.customer[0].fullname });
                }

                if (order?.agent?.length > 0) {
                    setSelectedAgent({ value: order.agent[0].id, label: order.agent[0].fullname });
                }

                if (order?.product_price) {
                    setSelectedProductPrice({ value: order.product_price.id, label: `${order.product_price.price}` });
                } else {
                    setSelectedProductPrice(null);
                }

                if (order?.product_commission) {
                    setSelectedProductCommision({ value: order.product_commission.id, label: `${order.product_commission.commission}` });
                } else {
                    setSelectedProductCommision(null);
                }


                setSelectedStatus(order?.status_label || '');

            } catch (err) {
                console.error('Error fetching order:', err);
                toast.error("Failed to fetch order.");
            }
        };

        fetchOrder();
    }, [params.id]);




    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                {/* Navbar */}
                <Navbar navImg1={'../../dist/img/user1-128x128.jpg'} navImg2={'../../dist/img/user8-128x128.jpg'} navImg3={'../../dist/img/user3-128x128.jpg'} />

                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <BrandLogo />
                    <div className="sidebar">
                        <UserPanel />
                        <SearchForm />
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
                    </div>
                </aside>

                <div className="content-wrapper">
                    <Content_Header title={'View Order'} link={'Home'} />
                    <section className="content pt-5 pb-5">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Order View Form</h3>
                                        </div>
                                        <form className="form-horizontal">
                                            <div className="card-body">
                                                {/* products */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Products :</label>
                                                    <Select options={orders.map(order => ({ value: order.id, label: order.name }))} isMulti value={selectedOrders} onChange={setSelectedOrders} />
                                                </div>
                                                {/* customers */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Customer :</label>
                                                    <Select options={customers.map(cust => ({ value: cust.id, label: cust.fullname }))} isMulti value={selectedCustomer} onChange={setSelectedCustomer} />
                                                </div>
                                                {/* agents */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Agent :</label>
                                                    <Select options={agents.map(agent => ({ value: agent.id, label: agent.fullname }))} isMulti value={selectedAgent} onChange={setSelectedAgent} />
                                                </div>
                                                {/* product price */}
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label">Product Price:</label>
                                                    <Select options={productPrices.map(price => ({ value: price.id, label: `${price.price}` }))} value={selectedProductPrice} onChange={setSelectedProductPrice} />
                                                </div>
                                                {/* product commision */}
                                                <div className="form-group row" >
                                                    <label className="col-sm-2 col-form-label">Product Commission:</label>
                                                    <Select options={productCommisions.map(comm => ({ value: comm.id, label: `${comm.commission}` }))} value={selectedProductCommision} onChange={setSelectedProductCommision} />
                                                </div>

                                                {/* status */}
                                                <div className="form-group row" >
                                                    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Status :</label>
                                                    <div class="">
                                                        <input value={selectStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                                                            type="text" class="form-control" id="inputEmail3" placeholder="Product price id" />
                                                    </div>
                                                </div>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </div>
    );
}
