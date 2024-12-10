import { login } from './authSlice'
import { users } from "../data/users"

export const loginThunk = (username, password) => async (dispatch) => {
    const user = users.find(user => user.user === username && user.password === password)

    if (user) {
        const userData = { user: user.user, name: user.name }
        dispatch(login(userData))
    } else {
        dispatch(alert("Invalid credentials!"))
    }
}
