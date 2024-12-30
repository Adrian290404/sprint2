import { login } from './authSlice';
import { users } from "../../data/users";
import { rooms } from "../../data/rooms";
import { employees } from "../../data/employees";
import { bookings } from "../../data/bookings";
import { reviews } from "../../data/reviews";
import { AppDispatch } from '../store';

interface LoginUser {
    user: string;
    password: string;
    name: string;
}

interface UserData {
    email: string;
    name: string;
}

export const loginThunk = (username: string, password: string) => async (dispatch: AppDispatch) => {
    const user = users.find((user: LoginUser) => user.user === username && user.password === password);

    if (user) {
        const userData: UserData = { email: user.user, name: user.name };
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
    } 
    else {
        console.error("Invalid credentials!");
    }
};