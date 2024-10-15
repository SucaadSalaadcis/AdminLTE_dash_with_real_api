import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Recover_password_v2() {
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { token } = useParams();

    const handleSumbit = (e) => {

        e.preventDefault();

        try {
            axios.post('http://localhost:3000/auth/reset-password/' + token, { password }).then((response) => {
                if (response.data.status) {
                    toast.success('Changed your password successfuly...')
                    navigate('/example/login_v2');
                }
                console.log(response.data);
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        } catch (error) {
             console.log(error);
        }
    }
    // console.log(password);
    return (
        <div class="hold-transition login-page">
            <div class="login-box">
                <div class="card card-outline card-primary">
                    <div class="card-header text-center">
                        <a class="h1"><b>ADWAAR</b></a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
                        <form onSubmit={handleSumbit}>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="*******"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Confirm Password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div> */}
                            <div class="row">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-block">Change password</button>
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
