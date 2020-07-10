import axios from 'axios';
import { Base_URL } from "store/services/baseurl";

export default {
    auth(url = Base_URL.baseUrl + 'Account/'){
        return {
            signUp: data => axios.post(url + 'Register/', data),
            signIn: data => axios.post(url + 'Login/', data),
            signOut: () => axios.post(url + 'Logout/')
        }
    }
}