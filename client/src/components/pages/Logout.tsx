import axios from "axios";
import { useNavigate } from "solid-app-router";
import { onMount } from "solid-js";

const Logout = () => {
    const navigate = useNavigate();
    onMount(async() => {
        try {
            await axios.get('http://localhost:8080/sanctum/csrf-cookie');
            await axios.post('http://localhost:8080/users/logout');
        } catch(e) {
            if (axios.isAxiosError(e)) {
            }
        }
        navigate('/');
    });
    return <></>
}

export default Logout;