import { login } from './authSlice';
import { users } from "../../data/users";
import { rooms } from "../../data/rooms";

export const loginThunk = (username, password) => async (dispatch) => {
    const user = users.find(user => user.user === username && user.password === password);

    if (user) {
        const userData = { email: user.user, name: user.name };
        dispatch(login(userData));
        if (!localStorage.getItem("rooms")) {
            localStorage.setItem("rooms", JSON.stringify(rooms));
        }
    } else {
        dispatch(alert("Invalid credentials!"));
    }
};