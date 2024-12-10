import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { LayoutComponent } from "./components/common/layoutComponent"
import { LogInPage } from "./pages/logInPage"
import { DashBoardPage } from "./pages/dashBoardPage"
import { ProfilePage } from "./pages/profilePage"
import { ContactPage } from "./pages/contactPage"
import { RoomListPage } from "./pages/roomListPage"
import { RoomCreatePage } from "./pages/roomCreatePage"
import { RoomDetailsPage } from "./pages/roomDetailsPage"
import { BookingsListPage } from "./pages/bookingsListPage"
import { BookingsCreatePage } from "./pages/bookingsCreatePage"
import { BookingsDetailsPage } from "./pages/bookingsDetailsPage"
import { UsersListPage } from "./pages/usersListPage"
import { UsersCreatePage } from "./pages/usersCreatePage"
import { UsersDetailsPage } from "./pages/usersDetailsPage"
import { DashBoardCustomerReviewPage } from "./pages/dashBoardCustomerReviewPage"
import { useSelector, useDispatch } from "react-redux"
import { login, logout } from "./features/authSlice"

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged) // Obtener estado de login desde Redux
  const dispatch = useDispatch()
  localStorage.removeItem("isLogged")

  return (

      <BrowserRouter>
        <Routes>
          {/* Página de Login */}
          <Route
            path="/"
            element={
              !isLogged ? (
                <LogInPage onLogin={() => dispatch(login())} /> // Dispatch del login en Redux
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Rutas Privadas */}
          {isLogged && (
            <Route path="/" element={<LayoutComponent onLogout={() => dispatch(logout())} />}>
              <Route path="dashboard">
                <Route index element={<DashBoardPage />} />
                <Route path="customerReviews" element={<DashBoardCustomerReviewPage />} />
              </Route>

              {/* CRUD Rooms */}
              <Route path="room">
                <Route index element={<RoomListPage />} />
                <Route path="create" element={<RoomCreatePage />} />
                <Route path=":id" element={<RoomDetailsPage />} />
              </Route>

              {/* CRUD Bookings */}
              <Route path="bookings">
                <Route index element={<BookingsListPage />} />
                <Route path="create" element={<BookingsCreatePage />} />
                <Route path=":id" element={<BookingsDetailsPage />} />
              </Route>

              <Route path="profile" element={<ProfilePage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* CRUD Users */}
              <Route path="users">
                <Route index element={<UsersListPage />} />
                <Route path="create" element={<UsersCreatePage />} />
                <Route path=":id" element={<UsersDetailsPage />} />
              </Route>
            </Route>
          )}

          {/* Redirige a login si no está logueado */}
          {!isLogged && <Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
      </BrowserRouter>
  )
}

export default App