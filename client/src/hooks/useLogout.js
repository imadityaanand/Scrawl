import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user');

        // Dispatch Logout action
        dispatch({type: 'LOGOUT'});

        navigate('/login');
    }
    
    return {logout};
}