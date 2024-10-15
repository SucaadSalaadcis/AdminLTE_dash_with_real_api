import React, { useState } from 'react'

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register_v2() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // In JavaScript, when we talk about instances, 
    // we are often referring to objects that have been created from a constructor function.
    const navigate = useNavigate(); // inistance tixraac


    const handleSumbit = (e) => {
        
        e.preventDefault();

        try {
            axios.post('https://spiky-crater-dep2vxlep8.ploi.online/api/auth/register', { name, email, password }).then((response) => {
                // console.log(response);
                if (response.data.status) {
                    toast.success('Registered Successfuly...');
                    navigate('/example/login_v2');
                }
            }).catch(err => {
                toast.error(err.response.data.message);
                // console.log(err.response.data.message)
            });

        } catch (error) {
           console.log(error)
        }

    }
    return (
        <div class="hold-transition register-page">
            <div class="register-box">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a class="h1"><b>ADWAAR</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">Register a new membership</p>

                        <form onSubmit={handleSumbit}>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Full name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Retype password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div> */}
                            <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                        <label for="agreeTerms">
                                            I agree to the <a href="#">terms</a>
                                        </label>
                                    </div>
                                </div>
                                {/* <!-- /.col --> */}
                                <div class="col-4">
                                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                        </form>

                        <div class="social-auth-links text-center">
                            <a href="#" class="btn btn-block btn-primary">
                                <i class="fab fa-facebook mr-2"></i>
                                Sign up using Facebook
                            </a>
                            <a href="#" class="btn btn-block btn-danger">
                                <i class="fab fa-google-plus mr-2"></i>
                                Sign up using Google+
                            </a>
                        </div>

                        <Link to={'/example/login_v2'} class="text-center">I already have a membership</Link>
                    </div>
                    {/* <!-- /.form-box --> */}
                </div>
            </div>
            {/* <!-- /.register-box --> */}


        </div>
    )
}
