import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LayoutComponent } from "./components/common/layoutComponent"
import { LogInPage } from "./pages/logInPage"
import { DashBoardPage } from "./pages/dashBoardPage"
import { RoomPage } from "./pages/roomPage"
import { BookingsPage } from "./pages/bookingsPage"
import { GuestPage } from "./pages/guestPage"
import { ConciergePage } from "./pages/conciergePage"
import { UserPage } from "./pages/userPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LayoutComponent />}>
                    <Route path="" element={<LogInPage />}></Route>
                    <Route path="/dashboard" element={<DashBoardPage />}></Route>
                    <Route path="/room" element={<RoomPage />}></Route>
                    <Route path="/bookings" element={<BookingsPage />}></Route>
                    <Route path="/guest" element={<GuestPage />}></Route>
                    <Route path="/concierge" element={<ConciergePage />}></Route>
                    <Route path="/user" element={<UserPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App