import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';

export default function Forgot_password_v2() {
    const [email, setEmail] = useState('');

    // In JavaScript, when we talk about instances, 
    // we are often referring to objects that have been created from a constructor function.
    const navigate = useNavigate(); // inistance tixraac

    const handleSumbit = (e) => {

        e.preventDefault();

        try {

            axios.post('http://localhost:3000/auth/forgot-password', { email }).then((response) => {
                console.log(response);
                if (response.data.status) {
                    toast.success('Check Your Email For Reset Password Link')
                    navigate('/example/login_v2');
                }
            }).catch((err) => {
                toast.error(err.response.data.message);
            });

        } catch (error) {
          console.log(error)
        }
    }
    // console.log(email);
    return (
        <div class="hold-transition login-page">
            <div class="login-box">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a class="h1"><b>ADWAAR</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                        <form onSubmit={handleSumbit} >
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
                            <div class="row">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                        </form>
                        <p class="mt-3 mb-1">
                            <Link to={'/example/login_v2'}>Login</Link>
                        </p>
                    </div>
                    {/* <!-- /.login-card-body --> */}
                </div>
            </div>
            {/* <!-- /.login-box --> */}


        </div>
    )
}
