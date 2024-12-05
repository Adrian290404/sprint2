import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { LayoutComponent } from "./components/common/layoutComponent"
import { LogInPage } from "./pages/logInPage"
import { DashBoardPage } from "./pages/dashBoardPage"
import { ProfilePage } from "./pages/profilePage"
import { RoomListPage } from "./pages/roomListPage"
import { RoomCreatePage } from "./pages/roomCreatePage"
import { RoomDetailsPage } from "./pages/roomDetailsPage"
import { BookingsListPage } from "./pages/bookingsListPage"
import { BookingsCreatePage } from "./pages/bookingsCreatePage"
import { BookingsDetailsPage } from "./pages/bookingsDetailsPage"
import { ConciergeListPage } from "./pages/conciergeListPage"
import { ConciergeCreatePage } from "./pages/conciergeCreatePage"
import { ConciergeDetailsPage } from "./pages/conciergeDetailsPage"
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
        <Route path="/" element={!isLogged ? <LogInPage onLogin={login} /> : <Navigate to="/dashboard" />} />

        {/* Private Routes */}
        {isLogged && (
          <Route path="/" element={<LayoutComponent onLogout={logout} />}>
            <Route path="/dashboard" element={<DashBoardPage />} />

            {/* CRUD Rooms */}
            <Route path="room">
              <Route index element={<RoomListPage />} /> {/* Room List */}
              <Route path="create" element={<RoomCreatePage />} /> {/* Create Room */}
              <Route path=":id" element={<RoomDetailsPage />} /> {/* Room details */}
            </Route>

            {/* CRUD Bookings */}
            <Route path="bookings">
              <Route index element={<BookingsListPage />} /> {/* Bookings List */}
              <Route path="create" element={<BookingsCreatePage />} /> {/* Create Booking */}
              <Route path=":id" element={<BookingsDetailsPage />} /> {/* Bookings details */}
            </Route>

            <Route path="profile" element={<ProfilePage />} />

            {/* CRUD Concierge (Users) */}
            <Route path="concierge">
              <Route index element={<ConciergeListPage />} /> {/* User List */}
              <Route path="create" element={<ConciergeCreatePage />} /> {/* Create User */}
              <Route path=":id" element={<ConciergeDetailsPage />} /> {/* User details */}
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