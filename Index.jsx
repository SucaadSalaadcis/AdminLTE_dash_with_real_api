import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import toast from 'react-hot-toast';

import RefreshPage from './src/RefreshPage';

import Logout from './pages/examples/Logout';
import { BrandLogo, Content_Header, Footer, Navbar, SearchForm, UserPanel } from './pages/tables/reusible/Sidebar';

import Cookies from 'js-cookie';

export default function Index() {

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {

        } else {
            navigate('/example/login_v2');
        }
    }, [])

    $(function () {
      
        //--------------
        //- AREA CHART -
        //--------------

        // Get context with jQuery - using jQuery's .get() method.
        var areaChartCanvas = $('#areaChart').get(0).getContext('2d')

        var areaChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Digital Goods',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: [100, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: 'Electronics',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
            ]
        }

        var areaChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    }
                }]
            }
        }

        // This will get the first returned node in the jQuery collection.
        new Chart(areaChartCanvas, {
            type: 'line',
            data: areaChartData,
            options: areaChartOptions
        })

        //-------------
        //- LINE CHART -
        //--------------
        var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
        var lineChartOptions = $.extend(true, {}, areaChartOptions)
        var lineChartData = $.extend(true, {}, areaChartData)
        lineChartData.datasets[0].fill = false;
        lineChartData.datasets[1].fill = false;
        lineChartOptions.datasetFill = false

        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: lineChartData,
            options: lineChartOptions
        })

        //-------------
        //- DONUT CHART -
        //-------------
        // Get context with jQuery - using jQuery's .get() method.
        var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
        var donutData = {
            labels: [
                '2024-01-01',
                '2024-01-02',
                '2024-01-03',
                '2024-01-04',
                '2024-01-05',
                '2024-01-06',
            ],
            datasets: [
                {
                    data: [700, 500, 400, 600, 300, 100],
                    backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                }
            ]
        }
        var donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
        }
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions
        })

        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = $.extend(true, {}, areaChartData)
        var temp0 = areaChartData.datasets[0]
        var temp1 = areaChartData.datasets[1]
        barChartData.datasets[0] = temp1
        barChartData.datasets[1] = temp0

        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }

        new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })

    
    })



    return (
        <div class="hold-transition sidebar-mini">
            <div class="wrapper">
                {/* <!-- Navbar --> */}
                <Navbar navImg1={'dist/img/user1-128x128.jpg'} navImg2={'dist/img/user8-128x128.jpg'} navImg3={'dist/img/user3-128x128.jpg'} />
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

                                <li class="nav-item"><Link to={'/'} onClick={RefreshPage} class="nav-link active"><i class="nav-icon fas fa-tachometer-alt"></i><p>Dashboard</p></Link></li>

                                <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon fas fa-table"></i><p>UserManagement<i class="fas fa-angle-left right"></i></p></a>

                                    <ul class="nav nav-treeview">
                                        <li class="nav-item"><Link to={'/user-management/permission'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Permissions</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/roles'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Roles</p></Link></li>
                                        <li class="nav-item"><Link to={'/user-management/users'} class="nav-link"><i class="far fa-circle nav-icon"></i><p>Users</p></Link></li>
                                    </ul>

                                </li>


                                <li class="nav-item"><Link to={'/products'} class="nav-link"><i class="nav-icon fas fa-tree"></i><p>Product</p></Link></li>
                                <li class="nav-item"><Link to={'/customers'} class="nav-link"><i class="far fa-user nav-icon"></i><p>Customer</p></Link></li>
                                <li class="nav-item"><Link to={'/agents'} class="nav-link "><i class="nav-icon far fa-plus-square"></i><p>Agent</p></Link></li>
                                <li class="nav-item"><Link to={'/orders'} class="nav-link "><i class="nav-icon fas fa-ellipsis-h"></i><p>Order</p></Link></li>

                                <li class="nav-item">
                                    <a class="nav-link">
                                        <IoIosLogOut style={{ color: "white", fontSize: "20px", marginLeft: '5px', fontWeight: 'bolder' }} />
                                        <p style={{ cursor: 'pointer' }} ><Logout /></p>
                                       
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
                    <Content_Header title={'ADWAAR'} link={'Home'} />


                    {/* <!-- Main content --> */}
                    <section class="content">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6">
                                    {/* <!-- AREA CHART --> */}
                                    <div class="card card-primary">
                                        <div class="card-header">
                                            <h3 class="card-title">Area Chart</h3>

                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="chart">

                                                <canvas id="areaChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                                            </div>
                                        </div>
                                        {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}

                                    {/* <!-- DONUT CHART --> */}
                                    <div class="card card-danger">
                                        <div class="card-header">
                                            <h3 class="card-title">Donut Chart</h3>

                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <canvas id="donutChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                                        </div>
                                        {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}

                                 

                                </div>
                                {/* <!-- /.col (LEFT) --> */}
                                <div class="col-md-6">
                                    {/* <!-- LINE CHART --> */}
                                    <div class="card card-info">
                                        <div class="card-header">
                                            <h3 class="card-title">Line Chart</h3>

                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="chart">
                                                <canvas id="lineChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                                            </div>
                                        </div>
                                        {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}

                                    {/* <!-- BAR CHART --> */}
                                    <div class="card card-success">
                                        <div class="card-header">
                                            <h3 class="card-title">Bar Chart</h3>

                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="chart">
                                                <canvas id="barChart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                                            </div>
                                        </div>
                                        {/* <!-- /.card-body --> */}
                                    </div>
                                    {/* <!-- /.card --> */}

                               
                                    {/* <!-- /.card --> */}

                                </div>
                                {/* <!-- /.col (RIGHT) --> */}
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
