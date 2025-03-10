import { login, setError } from './authSlice';
import { reviews } from "../../data/reviews";
import { AppDispatch } from '../store';

interface AuthUser {
    name: string;
    email: string;
}

const url = import.meta.env.VITE_API_URL + '/auth/login';

export const loginThunk = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setError(null)); 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const data = await response.json();

        const userData: AuthUser = {
            name: data.name,
            email: data.email,
        };

        dispatch(login({ user: userData, token: data.token }));

        if (!localStorage.getItem("reviews")) {
            localStorage.setItem("reviews", JSON.stringify(reviews));
        }

    } catch (error: any) {
        console.error('Login failed:', error);
        dispatch(setError(error.message)); 
    }
};