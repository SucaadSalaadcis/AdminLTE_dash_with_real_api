import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 

export default function Logout() {

    const navigate = useNavigate(); // Correctly use the hook inside the component

    const handleLogout = () => {
        // localStorage.clear();
        Cookies.remove('token')
        navigate('/example/login_v2')
    };

    return (
        <p style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={handleLogout}>
            Logout
        </p>
    );
}
