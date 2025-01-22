import { login } from './authSlice';
import { reviews } from "../../data/reviews";
import { AppDispatch } from '../store';

interface AuthUser {
    name: string;
    email: string;
}


export const loginThunk = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error in login');
        }

        const data = await response.json();

        const userData: AuthUser = {
            name: data.name,
            email: data.email,
        };

        localStorage.setItem('authToken', data.token);

        dispatch(login(userData));

        if (!localStorage.getItem("reviews")) {
            localStorage.setItem("reviews", JSON.stringify(reviews));
        }
    } 
    catch (error) {
        console.error('Error:', error);
    }
};