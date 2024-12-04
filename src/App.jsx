import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { LayoutComponent } from "./components/common/layoutComponent"
import { LogInPage } from "./pages/logInPage"
import { DashBoardPage } from "./pages/dashBoardPage"
import { GuestPage } from "./pages/guestPage"
import { ConciergePage } from "./pages/conciergePage"
import { RoomListPage } from "./pages/roomListPage"
import { RoomCreatePage } from "./pages/roomCreatePage"
import { RoomDetailsPage } from "./pages/roomDetailsPage"
import { BookingsListPage } from "./pages/bookingsListPage"
import { BookingsCreatePage } from "./pages/bookingsCreatePage"
import { BookingsDetailsPage } from "./pages/bookingsDetailsPage"
import { UserListPage } from "./pages/userListPage"
import { UserCreatePage } from "./pages/userCreatePage"
import { UserDetailsPage } from "./pages/userDetailsPage"
import { useState, useEffect } from "react"

function App() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem("isLogged")
    if (storedAuth === "true") {
      setIsLogged(true)
    }
  }, [])

  const login = () => {
    setIsLogged(true)
    localStorage.setItem("isLogged", "true")
  }

  const logout = () => {
    setIsLogged(false)
    localStorage.setItem("isLogged", "false")
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isLogged ? <LogInPage onLogin={login} /> : <Navigate to="/dashboard" replace />} />

        {/* Private Routes */}
        {isLogged && (
          <Route path="/" element={<LayoutComponent onLogout={logout} />}>
            <Route path="/dashboard" element={<DashBoardPage />} />

            {/* CRUD de Rooms */}
            <Route path="room">
              <Route index element={<RoomListPage />} /> {/* Room List */}
              <Route path="create" element={<RoomCreatePage />} /> {/* Create Room */}
              <Route path=":roomId" element={<RoomDetailsPage />} /> {/* Room details */}
            </Route>

            {/* CRUD de Bookings */}
            <Route path="bookings">
              <Route index element={<BookingsListPage />} /> {/* Bookings List */}
              <Route path="create" element={<BookingsCreatePage />} /> {/* Create Booking */}
              <Route path=":bookingId" element={<BookingsDetailsPage />} /> {/* Bookings details */}
            </Route>

            <Route path="guest" element={<GuestPage />} />
            <Route path="concierge" element={<ConciergePage />} />

            {/* CRUD de Users */}
            <Route path="user">
              <Route index element={<UserListPage />} /> {/* User List */}
              <Route path="create" element={<UserCreatePage />} /> {/* Create User */}
              <Route path=":userId" element={<UserDetailsPage />} /> {/* User details */}
            </Route>
          </Route>
        )}

        {/* Si no está logueado, redirige a la página de login */}
        {!isLogged && <Route path="*" element={<Navigate to="/" replace />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App