import { login } from './authSlice';
import { users } from "../../data/users";
import { rooms } from "../../data/rooms";
import { employees } from "../../data/employees";
import { bookings } from "../../data/bookings";
import { reviews } from "../../data/reviews";
import { AppDispatch } from '../store';

interface AuthUser {
    name: string;
    email: string;
}

interface LoginUser {
    user: string;
    password: string;
    name: string;
}

export const loginThunk = (username: string, password: string) => async (dispatch: AppDispatch) => {
    const user = users.find((user: LoginUser) => user.user === username && user.password === password);

    if (user) {
        const userData: AuthUser = { name: user.name, email: user.user }; 
        dispatch(login(userData)); 

        if (!localStorage.getItem("rooms")) {
            localStorage.setItem("rooms", JSON.stringify(rooms));
        }
        if (!localStorage.getItem("employees")) {
            localStorage.setItem("employees", JSON.stringify(employees));
        }
        if (!localStorage.getItem("bookings")) {
            localStorage.setItem("bookings", JSON.stringify(bookings));
        }
        if (!localStorage.getItem("reviews")) {
            localStorage.setItem("reviews", JSON.stringify(reviews));
        }
    } else {
        console.error("Invalid credentials!");
    }
};
