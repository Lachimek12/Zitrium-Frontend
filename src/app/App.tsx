/* Libraries */
import { Navigate, Route, Routes } from "react-router-dom";

/* App modules imports */
import HomePage from "@pages/HomePage";
import NotFound from "@pages/404";
import Register from "@pages/Register";
import Profile from "@pages/Profile";
import ProtectedRoute from "@components/ProtectedRoute";
import MainLayout from "@layout/MainLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Redirect from root to /app */}
        <Route path="/" element={<Navigate to="/app" />} />

        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/app" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
}

export default App;

/*
        <Route path="*" element={<SimpleLayout />}>
          <Route index element={<Navigate to="/404" />} />
        </Route>
        */
