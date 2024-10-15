import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; 

export default function Login_v2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // const handleSumbit = (e) => {
    //     e.preventDefault();
    //     const user_data = new URLSearchParams();

    //     user_data.append('email', email);
    //     user_data.append('password', password);

    //     axios.post('https://spiky-crater-dep2vxlep8.ploi.online/api/auth/login', user_data, {
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     })
    //         .then(user_data => {
    //             console.log('Login successful:', user_data.data);
    //         })
    //         .catch(error => {
    //             console.log('Error response:', error.user_data);
    //             if (error.user_data) {
    //                 console.log('Status code:', error.user_data.status);
    //                 console.log('Error message:', error.user_data.data.message);
    //             } else {
    //                 console.log('Error:', error.message);
    //             }
    //         });


    // }

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const user_data = await axios.post('https://spiky-crater-dep2vxlep8.ploi.online/api/auth/login',
                { email, password }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((user_data) => {
                // ku store garey token in cookie 
                Cookies.set('token', user_data.data.token, { expires: 7, });
                // localStorage.setItem('token',user_data.data.token);

                toast.success('Login successful:', user_data.data)
                window.location.href = '/';
            })

            console.log('Login successful:', user_data.data);

            // Redirect user to dashboard
        } catch (error) {
            console.error('Error user_data:', error.response);
        }

    }

    // email: admin@admin.com
    // password: password

    return (
        <div class="hold-transition login-page">
            <div class="login-box">
                {/* <!-- /.login-logo --> */}
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a class="h1"><b>ADWAAR</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={handleSumbit}>
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Email" autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="******" autoComplete='off'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* <!-- /.col --> */}
                                <div class="col-4">
                                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                        </form>

                        <div class="social-auth-links text-center mt-2 mb-3">
                            <a href="#" class="btn btn-block btn-primary">
                                <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </a>
                            <a href="#" class="btn btn-block btn-danger">
                                <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </a>
                        </div>
                        {/* <!-- /.social-auth-links --> */}

                        <p class="mb-1">
                            <Link to={'/example/forgot_password_v2'}>I forgot my password</Link>
                        </p>
                        <p class="mb-0">
                            <a class="text-center" >

                                <Link to={'/example/register_v2'}>Register a new membership</Link>
                            </a>
                        </p>
                    </div>
                    {/* <!-- /.card-body --> */}
                </div>
                {/* <!-- /.card --> */}
            </div>
            {/* <!-- /.login-box --> */}


        </div>
    )
}
