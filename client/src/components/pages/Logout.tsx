import axios from "axios";
import { useNavigate } from "solid-app-router";
import { onMount } from "solid-js";
import env from "../../helpers/Env";

const Logout = () => {
    const navigate = useNavigate();
    onMount(async() => {
        try {
            await axios.get(`${env.API_URL}/sanctum/csrf-cookie`);
            await axios.post(`${env.API_URL}/users/logout`);
        } catch(e) {
            if (axios.isAxiosError(e)) {
            }
        }
        navigate('/');
    });
    return <></>
}

export default Logout;